// src/cart/cart.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Cart } from '../entities/cart.entity';

@Injectable()
export class CartRepository {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<Cart>,
  ) {}

  async findByUserId(userId: string): Promise<Cart | null> {
    const test = await this.cartModel
      .findOne({ userId })
      .populate('items.product')
      .exec();
    console.log({ test: test?.items });
    return test;
  }

  async addToCart(userId: string, addToCartDto: object) {
    return await this.cartModel.create({
      userId,
      items: [addToCartDto],
    });
  }

  async createEmptyCart(userId: string): Promise<Cart> {
    return this.cartModel.create({
      userId,
      items: [],
    });
  }

  async findProduct(userId: string, productId: string): Promise<boolean> {
    const cart = await this.cartModel.findOne({ userId });
    return (
      cart?.items.some((item) => item.product.toString() === productId) ?? false
    );
  }

  async updateItem(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<Cart | null> {
    const cart = await this.cartModel.findOne({ userId });
    if (!cart) return null;

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
    }

    return cart.save();
  }

  async removeItem(userId: string, productId: string): Promise<void> {
    await this.cartModel
      .updateOne(
        { userId },
        {
          $pull: {
            items: { product: new Types.ObjectId(productId) },
          },
        },
      )
      .exec();
  }

  async clearCart(userId: string): Promise<void> {
    await this.cartModel.updateOne({ userId }, { $set: { items: [] } }).exec();
  }
}
