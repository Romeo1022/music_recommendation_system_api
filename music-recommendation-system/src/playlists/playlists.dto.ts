
import {
  IsString,
  IsInt,
  MaxLength,
} from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';

export class CreatePlaylistDto {
  @IsInt()
  userId!: number;

  @IsString()
  @MaxLength(150)
  name!: string;
}

export class UpdatePlaylistDto extends PartialType(
  CreatePlaylistDto,
) {}
