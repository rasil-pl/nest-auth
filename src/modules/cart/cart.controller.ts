import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { CurrentUser, Roles } from '../../common/decorators';
import { RequestCurrentUser } from '../../types';
import { JwtAuthGuard } from '../auth/guards';
import { Role } from '../users/enums';
import { AddToCartDto, AddToCartResponseDto } from './dto/add-to-cart.dto';
import {
  UpdateCartItemDto,
  UpdateCartItemResponseDto,
} from './dto/update-cart-item.dto';
import { CartService } from './providers/cart.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Roles(Role.USER)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({
    summary: 'Add item to cart',
    description:
      "Adds the item to the cart if the item was not already present, however if the item was already present, it increments the item's quantity by the item quantity amount.",
  })
  @ApiOkResponse({ type: AddToCartResponseDto })
  @Post('add')
  async addToCart(
    @CurrentUser() currentUser: RequestCurrentUser,
    @Body() addToCartDto: AddToCartDto,
  ) {
    const res = await this.cartService.addToCart(currentUser.id, addToCartDto);
    console.log({ res });
    return res;
  }

  @ApiOperation({
    summary: 'Update cart item',
    description:
      'Used to update the item which is already present in the cart, if quantity set to 0, the item will be removed from cart',
  })
  @ApiOkResponse({ type: UpdateCartItemResponseDto })
  @Patch('update/:productId')
  updateCartItem(
    @CurrentUser() currentUser: RequestCurrentUser,
    @Param('productId') productId: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartService.updateCartItem(
      currentUser.id,
      productId,
      updateCartItemDto,
    );
  }

  @ApiOperation({
    summary: 'Remove cart item',
    description:
      'Remove the product with any number of quantities from the cart',
  })
  @ApiOkResponse({ type: UpdateCartItemResponseDto })
  @Delete('remove/:productId')
  removeCartItem(
    @CurrentUser() currentUser: RequestCurrentUser,
    @Param('productId') productId: string,
  ) {
    return this.cartService.removeCartItem(currentUser.id, productId);
  }

  @ApiOperation({
    summary: 'Clear cart',
    description: "Discards all the cart items from the user's cart",
  })
  @ApiOkResponse({ type: UpdateCartItemResponseDto })
  @Delete('clear')
  clearCart(@CurrentUser() currentUser: RequestCurrentUser) {
    return this.cartService.clearCart(currentUser.id);
  }

  @ApiOperation({ summary: 'Get user cart' })
  @ApiOkResponse({ type: UpdateCartItemResponseDto })
  @Get()
  getUserCart(@CurrentUser() currentUser: RequestCurrentUser) {
    return this.cartService.getUserCart(currentUser.id);
  }
}
