import {Injectable,NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Favorite} from './favorite.entity';
import {CreateFavoriteDto,UpdateFavoriteDto} from './favorites.dto';
@Injectable() export class FavoriteService { constructor(@InjectRepository(Favorite) private repo:Repository<Favorite>){}
 list(){return this.repo.find();}
 async get(id:number){const x=await this.repo.findOneBy({id});if(!x)throw new NotFoundException('Favorite not found');return x;}
 create(dto:CreateFavoriteDto){return this.repo.save(this.repo.create(dto));}
 async update(id:number,dto:UpdateFavoriteDto){const x=await this.get(id);return this.repo.save(Object.assign(x,dto));}
 async remove(id:number){const x=await this.get(id);await this.repo.remove(x);return {deleted:true};}
}
