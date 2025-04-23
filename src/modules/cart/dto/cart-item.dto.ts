import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

import { addToCartDto } from './example';

export class CartItemDto {
  @ApiProperty({ example: addToCartDto.productId })
  @IsNotEmpty()
  @IsString()
  product: string;

  @ApiProperty({ example: addToCartDto.quantity })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  quantity: number;
}

class ProductResponseDto {
  @Expose()
  name: string;

  @Expose()
  price: number;
}

export class CartItemResponseDto {
  @ApiProperty({ example: addToCartDto.productId })
  @Type(() => ProductResponseDto)
  @Expose()
  product: string | ProductResponseDto;

  @ApiProperty({ example: addToCartDto.quantity })
  @Expose()
  quantity: number;
}
