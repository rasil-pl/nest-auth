import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { BaseSchema, BaseSchemaFactory } from '../../../common/entities';
import { CartItem } from './cart-item.entity';

@Schema({ collection: 'carts' })
export class Cart extends BaseSchema {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: CartItem.name }],
  })
  items: CartItem[];
}

export const CartEntity = SchemaFactory.createForClass(Cart);
CartEntity.add(BaseSchemaFactory);
