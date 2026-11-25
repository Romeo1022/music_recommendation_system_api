import {IsString,IsInt,MaxLength,IsOptional} from 'class-validator';
import {PartialType} from '@nestjs/mapped-types';
export class CreateFavoriteDto {
 @IsInt() userId:number;
 @IsInt() songId:number;
}
export class UpdateFavoriteDto extends PartialType(CreateFavoriteDto) {}
