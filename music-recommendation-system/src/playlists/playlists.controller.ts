
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
} from '@nestjs/common';

import { JwtGuard } from '../common/jwt.guard';
import { PlaylistsService } from './playlists.service';
import {
  CreatePlaylistDto,
  UpdatePlaylistDto,
} from './playlists.dto';

@Controller('playlists')
@UseGuards(JwtGuard)
export class PlaylistController {
  constructor(
    private readonly svc: PlaylistsService,
  ) {}

  @Get()
  list() {
    return this.svc.list();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.svc.get(id);
  }

  @Post()
  create(@Body() dto: CreatePlaylistDto) {
    return this.svc.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePlaylistDto,
  ) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }

  // ADD SONG
  @Post(':id/songs')
  addSong(
    @Param('id', ParseIntPipe) id: number,
    @Body('songId', ParseIntPipe) songId: number,
  ) {
    return this.svc.addSong(id, songId);
  }

  // GET PLAYLIST SONGS
  @Get(':id/songs')
  getSongs(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.svc.getSongs(id);
  }

  // REMOVE SONG
  @Delete(':id/songs/:songId')
  removeSong(
    @Param('id', ParseIntPipe) id: number,
    @Param('songId', ParseIntPipe) songId: number,
  ) {
    return this.svc.removeSong(id, songId);
  }
}
