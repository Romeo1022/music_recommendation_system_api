import {Injectable,ConflictException,UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import {User} from '../users/user.entity';
import {RegisterDto,LoginDto} from './auth.dto';
@Injectable() export class AuthService {
 constructor(@InjectRepository(User) private users:Repository<User>,private jwt:JwtService){}
 async register(dto:RegisterDto){if(await this.users.findOneBy({email:dto.email}))throw new ConflictException('Email already registered');const user=await this.users.save(this.users.create({username:dto.username,email:dto.email,passwordHash:await bcrypt.hash(dto.password,12),role:'user'}));return {id:user.id,username:user.username,email:user.email};}
 async login(dto:LoginDto){const user=await this.users.createQueryBuilder('u').addSelect('u.passwordHash').where('u.email = :email',{email:dto.email}).getOne();if(!user||!await bcrypt.compare(dto.password,user.passwordHash))throw new UnauthorizedException('Invalid credentials');return {access_token:await this.jwt.signAsync({sub:user.id,email:user.email,role:user.role})};}
}
