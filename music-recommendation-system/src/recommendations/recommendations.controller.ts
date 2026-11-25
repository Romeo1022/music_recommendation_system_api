import {Controller,Get,Post,Patch,Delete,Param,ParseIntPipe,Body,UseGuards} from '@nestjs/common';
import {JwtGuard} from '../common/jwt.guard';
import {RecommendationService} from './recommendations.service';
import {CreateRecommendationDto,UpdateRecommendationDto} from './recommendations.dto';
@Controller('recommendations') @UseGuards(JwtGuard) export class RecommendationController {constructor(private svc:RecommendationService){}
@Get() list(){return this.svc.list();}
@Get(':id') get(@Param('id',ParseIntPipe)id:number){return this.svc.get(id);}
@Post() create(@Body()dto:CreateRecommendationDto){return this.svc.create(dto);}
@Patch(':id') update(@Param('id',ParseIntPipe)id:number,@Body()dto:UpdateRecommendationDto){return this.svc.update(id,dto);}
@Delete(':id') remove(@Param('id',ParseIntPipe)id:number){return this.svc.remove(id);}
}
