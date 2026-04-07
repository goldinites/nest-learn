import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(9999)
  publishedYear: number;

  @IsString()
  genre: string;

  @IsString()
  language: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  stockCount: number;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  rating: number;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;
}
