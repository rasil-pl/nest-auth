// src/cart/cart.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { ProductsService } from '../../products/providers';
import { AddToCartDto, AddToCartResponseDto } from '../dto/add-to-cart.dto';
import {
  UpdateCartItemDto,
  UpdateCartItemResponseDto,
} from '../dto/update-cart-item.dto';
import { CartRepository } from './cart.repository';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productsService: ProductsService,
  ) {}

  async addToCart(userId: string, addToCartDto: AddToCartDto) {
    const product = await this.productsService.findOne(addToCartDto.product);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    console.log({ product });
    let cart = await this.cartRepository.findByUserId(userId);
    if (!cart) {
      cart = await this.cartRepository.addToCart(userId, {
        ...addToCartDto,
        product: product._id,
      });
      return plainToInstance(AddToCartResponseDto, cart, {
        excludeExtraneousValues: true,
      });
      // cart = await this.cartRepository.createEmptyCart(userId);
    }

    // const itemIndex = cart.items.findIndex(
    //   (item) => item.product.toString() === product._id.toString(),
    // );
    //
    // if (itemIndex > -1) {
    //   cart.items[itemIndex].quantity += addToCartDto.quantity;
    // } else {
    //   cart.items.push({
    //     product: new mongoose.Types.ObjectId(product._id),
    //     quantity: addToCartDto.quantity,
    //   });
    // }

    // const savedCart = await this.cartRepository.save(cart);
    // return plainToInstance(AddToCartResponseDto, savedCart, {
    //   excludeExtraneousValues: true,
    // });
  }

  async updateCartItem(
    userId: string,
    productId: string,
    dto: UpdateCartItemDto,
  ) {
    const exists = await this.cartRepository.findProduct(userId, productId);
    if (!exists) {
      throw new BadRequestException('Product must be added to cart first');
    }

    const updatedCart = await this.cartRepository.updateItem(
      userId,
      productId,
      dto.quantity,
    );

    const toBeRemoved = updatedCart?.items?.find(
      (item) => item.quantity === 0 && item.product.toString() === productId,
    );

    if (toBeRemoved) {
      await this.cartRepository.removeItem(userId, productId);
    }

    const finalCart = await this.cartRepository.findByUserId(userId);
    return plainToInstance(UpdateCartItemResponseDto, finalCart, {
      excludeExtraneousValues: true,
    });
  }

  async removeCartItem(userId: string, productId: string) {
    const product = await this.cartRepository.findProduct(userId, productId);
    if (!product) {
      throw new NotFoundException("Product doesn't exist in the cart");
    }

    await this.cartRepository.removeItem(userId, productId);
    const updatedCart = await this.cartRepository.findByUserId(userId);
    return plainToInstance(UpdateCartItemResponseDto, updatedCart, {
      excludeExtraneousValues: true,
    });
  }

  async clearCart(userId: string) {
    await this.cartRepository.clearCart(userId);
    const clearedCart = await this.cartRepository.findByUserId(userId);
    return plainToInstance(UpdateCartItemResponseDto, clearedCart, {
      excludeExtraneousValues: true,
    });
  }

  async getUserCart(userId: string) {
    const cart = await this.cartRepository.findByUserId(userId);
    console.log({ items: cart?.items });
    return plainToInstance(UpdateCartItemResponseDto, cart, {
      excludeExtraneousValues: true,
    });
  }
}
