import {IsString,IsInt,MaxLength,IsOptional} from 'class-validator';
import {PartialType} from '@nestjs/mapped-types';
export class CreateGenreDto {
 @IsString() @MaxLength(120) name:string;
}
export class UpdateGenreDto extends PartialType(CreateGenreDto) {}
