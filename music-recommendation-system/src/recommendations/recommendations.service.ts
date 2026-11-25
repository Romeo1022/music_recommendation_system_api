import {Injectable,NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Recommendation} from './recommendation.entity';
import {CreateRecommendationDto,UpdateRecommendationDto} from './recommendations.dto';
@Injectable() export class RecommendationService { constructor(@InjectRepository(Recommendation) private repo:Repository<Recommendation>){}
 list(){return this.repo.find();}
 async get(id:number){const x=await this.repo.findOneBy({id});if(!x)throw new NotFoundException('Recommendation not found');return x;}
 create(dto:CreateRecommendationDto){return this.repo.save(this.repo.create(dto));}
 async update(id:number,dto:UpdateRecommendationDto){const x=await this.get(id);return this.repo.save(Object.assign(x,dto));}
 async remove(id:number){const x=await this.get(id);await this.repo.remove(x);return {deleted:true};}
}
