import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { BaseSchema, BaseSchemaFactory } from '../../../common/entities';

@Schema({ collection: 'projects' })
export class Project extends BaseSchema {
  @Prop({ required: true, unique: true, minlength: 3, maxlength: 100 })
  name: string;

  @Prop({ required: false, maxlength: 5000 })
  description: string;

  @Prop({ required: false })
  startDate: Date;

  @Prop({ required: false })
  endDate: Date;

  @Prop()
  userId: string;
}

export const ProjectEntity = SchemaFactory.createForClass(Project);
ProjectEntity.add(BaseSchemaFactory);
