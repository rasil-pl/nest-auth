import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { BaseSchema, BaseSchemaFactory } from '../../../common/entities';
import { Role } from '../enums';

@Schema({ collection: 'users' })
export class User extends BaseSchema {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    required: true,
    enum: Role,
    default: Role.USER,
  })
  role: Role;
}

export const UserEntity = SchemaFactory.createForClass(User);
UserEntity.add(BaseSchemaFactory);
