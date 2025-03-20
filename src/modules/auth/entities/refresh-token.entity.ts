import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { BaseSchema, BaseSchemaFactory } from '../../../common/entities';

@Schema({ collection: 'refreshTokens' })
export class RefreshToken extends BaseSchema {
  @Prop({ required: true })
  token: string;

  @Prop({ type: Date, required: true })
  expiresAt: Date;

  @Prop({
    required: true,
    type: String,
    ref: 'User',
    unique: true,
  })
  userId: string;
}

export const RefreshTokenEntity = SchemaFactory.createForClass(RefreshToken);
RefreshTokenEntity.add(BaseSchemaFactory);
