import {Injectable,NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Genre} from './genre.entity';
import {CreateGenreDto,UpdateGenreDto} from './genres.dto';
@Injectable() export class GenreService { constructor(@InjectRepository(Genre) private repo:Repository<Genre>){}
 list(){return this.repo.find();}
 async get(id:number){const x=await this.repo.findOneBy({id});if(!x)throw new NotFoundException('Genre not found');return x;}
 create(dto:CreateGenreDto){return this.repo.save(this.repo.create(dto));}
 async update(id:number,dto:UpdateGenreDto){const x=await this.get(id);return this.repo.save(Object.assign(x,dto));}
 async remove(id:number){const x=await this.get(id);await this.repo.remove(x);return {deleted:true};}
}
