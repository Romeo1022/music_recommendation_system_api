import {Controller,Get,Post,Patch,Delete,Param,ParseIntPipe,Body,UseGuards,NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';import {Repository} from 'typeorm';import {JwtGuard} from '../common/jwt.guard';import {Song} from './song.entity';import {Artist} from '../artists/artist.entity';import {Rating} from '../ratings/rating.entity';import {CreateSongDto,UpdateSongDto} from './songs.dto';
@Controller('songs') @UseGuards(JwtGuard) export class SongsController {constructor(@InjectRepository(Song)private repo:Repository<Song>,@InjectRepository(Artist)private artists:Repository<Artist>,@InjectRepository(Rating)private ratings:Repository<Rating>){}
 @Get() list(){return this.repo.find({relations:{artist:true}});}
 @Get(':id/ratings') async ratingsFor(@Param('id',ParseIntPipe)id:number){await this.get(id);return this.ratings.find({where:{songId:id},relations:{user:true}}).then(rows=>rows.map(r=>({id:r.id,userId:r.userId,songId:r.songId,score:r.score,review:r.review})));}
 @Get(':id/average-rating') async average(@Param('id',ParseIntPipe)id:number){await this.get(id);const result=await this.ratings.createQueryBuilder('r').select('AVG(r.score)','average').addSelect('COUNT(*)','count').where('r.songId = :id',{id}).getRawOne();return {songId:id,average:result.average===null?null:Number(Number(result.average).toFixed(2)),count:Number(result.count)};}
 @Get(':id') async get(@Param('id',ParseIntPipe)id:number){const x=await this.repo.findOne({where:{id},relations:{artist:true}});if(!x)throw new NotFoundException('Song not found');return x;}
 private async checkArtist(id:number){if(!await this.artists.findOneBy({id}))throw new NotFoundException('Artist not found');}
 @Post() async create(@Body()dto:CreateSongDto){await this.checkArtist(dto.artistId);return this.repo.save(this.repo.create(dto));}
 @Patch(':id') async update(@Param('id',ParseIntPipe)id:number,@Body()dto:UpdateSongDto){const x=await this.get(id);if(dto.artistId!==undefined)await this.checkArtist(dto.artistId);return this.repo.save(Object.assign(x,dto));}
 @Delete(':id') async remove(@Param('id',ParseIntPipe)id:number){const x=await this.get(id);await this.repo.remove(x);return {deleted:true};}
}
