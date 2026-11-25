
import {
  IsOptional,
  IsString,
  IsInt,
  Min,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateSongDto {
  @IsString()
  @MinLength(1)
  @MaxLength(180)
  title!: string;

  @IsInt()
  @Min(1)
  artistId!: number;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  genre?: string;

  @IsOptional()
  @IsInt()
  @Min(1800)
  @Max(2100)
  releaseYear?: number;
}

export class UpdateSongDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(180)
  title?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  artistId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  genre?: string;

  @IsOptional()
  @IsInt()
  @Min(1800)
  @Max(2100)
  releaseYear?: number;
}
