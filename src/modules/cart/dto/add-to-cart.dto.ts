import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

import { BaseDto } from '../../../common/dtos';
import { CartItemResponseDto } from './cart-item.dto';
import { addToCartDto } from './example';

export class AddToCartDto {
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

export class AddToCartResponseDto extends BaseDto {
  @ApiProperty({ type: CartItemResponseDto, isArray: true })
  @Type(() => CartItemResponseDto)
  @Expose()
  items: CartItemResponseDto[];
}
