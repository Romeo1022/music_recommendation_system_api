import {Body,Controller,Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {RegisterDto,LoginDto} from './auth.dto';
@Controller('auth') export class AuthController {constructor(private svc:AuthService){} @Post('register') register(@Body() dto:RegisterDto){return this.svc.register(dto);} @Post('login') login(@Body() dto:LoginDto){return this.svc.login(dto);} }
