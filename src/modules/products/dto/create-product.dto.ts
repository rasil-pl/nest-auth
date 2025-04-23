import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

import { product } from './examples';

export class CreateProductDto {
  @ApiPropertyOptional({ example: product.imageUrl })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ example: product.name })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  name: string;

  @ApiPropertyOptional({ example: product.description })
  @IsString()
  @IsOptional()
  @MaxLength(10_000)
  description?: string;

  @ApiProperty({ example: product.price })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiPropertyOptional({ example: product.discount })
  @IsNumber()
  @IsOptional()
  discount?: number;

  @ApiPropertyOptional({
    example: product.categoryId,
    description: 'Provide category id',
  })
  @IsUUID()
  @IsOptional()
  category?: string;
}

export class CreateProductResponseDto {
  @Expose()
  @ApiProperty({ example: product.id })
  uuid: string;

  @Expose()
  @ApiProperty({ example: product.name })
  name: string;

  @Expose()
  @ApiProperty({ example: product.description })
  description: string;

  @Expose()
  @ApiProperty({ example: product.imageUrl })
  imageUrl: string;

  @Expose()
  @ApiPropertyOptional({ example: product.price })
  price: number;

  @Expose()
  @ApiPropertyOptional({ example: product.discount })
  discount?: number;

  @Expose()
  @ApiProperty({ example: product.createdAt })
  createdAt: Date;

  @Expose()
  @ApiProperty({ example: product.updatedAt })
  updatedAt: Date;
}
