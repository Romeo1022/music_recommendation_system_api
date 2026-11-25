import {Injectable,NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Artist} from './artist.entity';
import {CreateArtistDto,UpdateArtistDto} from './artists.dto';
@Injectable() export class ArtistsService {
 constructor(@InjectRepository(Artist)private repo:Repository<Artist>){}
 list(){return this.repo.find();}
 async get(id:number){const x=await this.repo.findOneBy({id});if(!x)throw new NotFoundException();return x;}
 create(dto:CreateArtistDto){return this.repo.save(this.repo.create(dto));}
 async update(id:number,dto:UpdateArtistDto){const x=await this.get(id);return this.repo.save(Object.assign(x,dto));}
 async remove(id:number){const x=await this.get(id);await this.repo.remove(x);return {deleted:true};}
}
