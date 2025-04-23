import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

import { product } from './examples';

export class GetProductCategoryResponseDto {
  @Expose()
  @ApiProperty({ example: product.category.uuid })
  uuid: string;

  @Expose()
  @ApiProperty({ example: product.category.name })
  name: string;
}

export class GetProductResponseDto {
  @Expose()
  @ApiProperty({ example: product.id })
  _id: string;

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
  @ApiProperty({ example: product.price })
  price: number;

  @Expose()
  @ApiProperty({ example: product.discount })
  discount: number;

  @Expose()
  @Type(() => GetProductCategoryResponseDto)
  @ApiProperty({ example: product.category })
  category: GetProductCategoryResponseDto;
}

export class GetProductsQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  categories: string;
}
