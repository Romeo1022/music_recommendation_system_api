import {Controller,Get,Post,Patch,Delete,Param,ParseIntPipe,Body,UseGuards} from '@nestjs/common';
import {JwtGuard} from '../common/jwt.guard';
import {GenreService} from './genres.service';
import {CreateGenreDto,UpdateGenreDto} from './genres.dto';
@Controller('genres') @UseGuards(JwtGuard) export class GenreController {constructor(private svc:GenreService){}
@Get() list(){return this.svc.list();}
@Get(':id') get(@Param('id',ParseIntPipe)id:number){return this.svc.get(id);}
@Post() create(@Body()dto:CreateGenreDto){return this.svc.create(dto);}
@Patch(':id') update(@Param('id',ParseIntPipe)id:number,@Body()dto:UpdateGenreDto){return this.svc.update(id,dto);}
@Delete(':id') remove(@Param('id',ParseIntPipe)id:number){return this.svc.remove(id);}
}
