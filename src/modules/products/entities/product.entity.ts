import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { BaseSchema, BaseSchemaFactory } from '../../../common/entities';
import { Category } from '../../categories/entities/category.entity';

@Schema({ collection: 'products' })
export class Product extends BaseSchema {
  @Prop({ required: false, type: String })
  imageUrl: string;

  @Prop({ required: true, type: String, maxlength: 500 })
  name: string;

  @Prop({ required: false, type: String, maxlength: 10_000 })
  description: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: false, type: Number, default: 0 })
  discount: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
  category: mongoose.Types.ObjectId;

  @Prop({ required: true, type: String })
  createdBy: string;
}

export const ProductEntity = SchemaFactory.createForClass(Product);
ProductEntity.add(BaseSchemaFactory);
