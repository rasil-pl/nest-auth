import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class BaseSchema {
  @Prop({ required: true, index: true, unique: true, default: uuidv4 })
  uuid: string;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ required: true, default: Date.now })
  updatedAt: Date;

  @Prop()
  deletedAt?: Date;
}

const BaseSchemaFactory = SchemaFactory.createForClass(BaseSchema);
BaseSchemaFactory.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export { BaseSchemaFactory };
