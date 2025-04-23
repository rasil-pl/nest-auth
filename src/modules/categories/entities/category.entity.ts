import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema, BaseSchemaFactory } from 'src/common/entities';

@Schema({ collection: 'categories' })
export class Category extends BaseSchema {
  @Prop({
    required: true,
    type: String,
    maxlength: 255,
  })
  name: string;

  @Prop({
    required: false,
    type: String,
    maxlength: 1000,
  })
  description: string;

  @Prop({ required: false, type: String })
  imageUrl: string;

  @Prop({ required: true, type: String })
  createdBy: string;
}

export const CategoryEntity = SchemaFactory.createForClass(Category);
CategoryEntity.add(BaseSchemaFactory);
