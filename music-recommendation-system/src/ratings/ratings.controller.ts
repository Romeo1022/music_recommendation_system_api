
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  Body,
  UseGuards,
  Req,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtGuard } from '../common/jwt.guard';
import { Rating } from './rating.entity';
import { Song } from '../songs/song.entity';
import { CreateRatingDto, UpdateRatingDto } from './ratings.dto';

@Controller('ratings')
@UseGuards(JwtGuard)
export class RatingsController {
  constructor(
    @InjectRepository(Rating)
    private readonly repo: Repository<Rating>,

    @InjectRepository(Song)
    private readonly songs: Repository<Song>,
  ) {}

  @Get()
  list() {
    return this.repo.find();
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    const rating = await this.repo.findOneBy({ id });

    if (!rating) {
      throw new NotFoundException('Rating not found');
    }

    return rating;
  }

  @Post()
  async create(@Req() req: any, @Body() dto: CreateRatingDto) {
    const userId = req.user.userId;

    const song = await this.songs.findOneBy({
      id: dto.songId,
    });

    if (!song) {
      throw new NotFoundException('Song not found');
    }

    const existingRating = await this.repo.findOneBy({
      userId,
      songId: dto.songId,
    });

    if (existingRating) {
      throw new ConflictException('You already rated this song');
    }

    const rating = this.repo.create({
      ...dto,
      userId,
    });

    return this.repo.save(rating);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
    @Body() dto: UpdateRatingDto,
  ) {
    const rating = await this.get(id);

    this.check(rating, req);

    return this.repo.save(Object.assign(rating, dto));
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
  ) {
    const rating = await this.get(id);

    this.check(rating, req);

    await this.repo.remove(rating);

    return { deleted: true };
  }

  private check(rating: Rating, req: any) {
    if (
      rating.userId !== req.user.userId &&
      req.user.role !== 'admin'
    ) {
      throw new ForbiddenException();
    }
  }
}
