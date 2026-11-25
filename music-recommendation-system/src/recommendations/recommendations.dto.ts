
import {
  IsString,
  IsInt,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateRecommendationDto {
  @IsInt()
  userId!: number;

  @IsInt()
  songId!: number;

  @IsInt()
  score!: number;

  @IsString()
  @MaxLength(255)
  reason!: string;
}

export class UpdateRecommendationDto extends PartialType(
  CreateRecommendationDto,
) {}
