import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { Product } from '../../products/entities/product.entity';

@Schema()
export class CartItem {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Product.name,
    required: true,
  })
  product: Product;

  @Prop({ type: Number, required: true, default: 1 })
  quantity: number;
}

export const CartItemEntity = SchemaFactory.createForClass(CartItem);
