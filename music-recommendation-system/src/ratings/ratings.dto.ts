import {IsOptional,IsString,IsInt,Min,Max,MaxLength} from 'class-validator';
export class CreateRatingDto {@IsInt() @Min(1) songId:number; @IsInt() @Min(1) @Max(5) score:number; @IsOptional() @IsString() @MaxLength(2000) review?:string;}
export class UpdateRatingDto {@IsOptional() @IsInt() @Min(1) @Max(5) score?:number; @IsOptional() @IsString() @MaxLength(2000) review?:string;}
