import {Controller,Get,Post,Patch,Delete,Param,ParseIntPipe,Body,UseGuards} from '@nestjs/common';
import {JwtGuard} from '../common/jwt.guard';
import {FavoriteService} from './favorites.service';
import {CreateFavoriteDto,UpdateFavoriteDto} from './favorites.dto';
@Controller('favorites') @UseGuards(JwtGuard) export class FavoriteController {constructor(private svc:FavoriteService){}
@Get() list(){return this.svc.list();}
@Get(':id') get(@Param('id',ParseIntPipe)id:number){return this.svc.get(id);}
@Post() create(@Body()dto:CreateFavoriteDto){return this.svc.create(dto);}
@Patch(':id') update(@Param('id',ParseIntPipe)id:number,@Body()dto:UpdateFavoriteDto){return this.svc.update(id,dto);}
@Delete(':id') remove(@Param('id',ParseIntPipe)id:number){return this.svc.remove(id);}
}
