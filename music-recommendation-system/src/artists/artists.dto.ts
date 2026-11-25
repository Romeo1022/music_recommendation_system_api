import {IsOptional,IsString,MaxLength,MinLength} from 'class-validator';
export class CreateArtistDto {@IsString() @MinLength(1) @MaxLength(150) name:string; @IsOptional() @IsString() @MaxLength(80) genre?:string;}
export class UpdateArtistDto {@IsOptional() @IsString() @MinLength(1) @MaxLength(150) name?:string; @IsOptional() @IsString() @MaxLength(80) genre?:string;}
