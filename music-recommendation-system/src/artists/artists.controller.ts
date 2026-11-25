import {Controller,Get,Post,Patch,Delete,Param,ParseIntPipe,Body,UseGuards} from '@nestjs/common';
import {JwtGuard} from '../common/jwt.guard';
import {ArtistsService} from './artists.service';
import {CreateArtistDto,UpdateArtistDto} from './artists.dto';
@Controller('artists') @UseGuards(JwtGuard) export class ArtistsController {
 constructor(private svc:ArtistsService){}
 @Get() list(){return this.svc.list();}
 @Get(':id') get(@Param('id',ParseIntPipe)id:number){return this.svc.get(id);}
 @Post() create(@Body()dto:CreateArtistDto){return this.svc.create(dto);}
 @Patch(':id') update(@Param('id',ParseIntPipe)id:number,@Body()dto:UpdateArtistDto){return this.svc.update(id,dto);}
 @Delete(':id') remove(@Param('id',ParseIntPipe)id:number){return this.svc.remove(id);}
}
