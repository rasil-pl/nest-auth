import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

import { BaseDto } from '../../../common/dtos';
import { CartItemResponseDto } from './cart-item.dto';
import { addToCartDto } from './example';

export class UpdateCartItemDto {
  @ApiProperty({ example: addToCartDto.quantity })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  quantity: number;
}

export class UpdateCartItemResponseDto extends BaseDto {
  @ApiProperty({ type: CartItemResponseDto, isArray: true })
  @Type(() => CartItemResponseDto)
  @Expose()
  items: CartItemResponseDto[];
}
