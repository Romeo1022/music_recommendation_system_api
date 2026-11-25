import {Controller,Get,Patch,Delete,Param,ParseIntPipe,Body,UseGuards,Req,ForbiddenException,NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {JwtGuard} from '../common/jwt.guard';
import {User} from './user.entity';
import {UpdateUserDto} from './users.dto';
@Controller('users') @UseGuards(JwtGuard) export class UsersController {
 constructor(@InjectRepository(User) private repo:Repository<User>){}
 @Get() list(@Req() req:any){if(req.user.role!=='admin')throw new ForbiddenException();return this.repo.find();}
 @Get(':id') async get(@Param('id',ParseIntPipe) id:number,@Req() req:any){this.check(id,req);const x=await this.repo.findOneBy({id});if(!x)throw new NotFoundException();return x;}
 @Patch(':id') async update(@Param('id',ParseIntPipe) id:number,@Req() req:any,@Body() dto:UpdateUserDto){this.check(id,req);const x=await this.repo.findOneBy({id});if(!x)throw new NotFoundException();Object.assign(x,dto);return this.repo.save(x);}
 @Delete(':id') async remove(@Param('id',ParseIntPipe) id:number,@Req() req:any){this.check(id,req);const result=await this.repo.delete(id);if(!result.affected)throw new NotFoundException();return {deleted:true};}
 private check(id:number,req:any){if(req.user.id!==id&&req.user.role!=='admin')throw new ForbiddenException();}
}
