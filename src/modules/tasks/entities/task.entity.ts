import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { BaseSchema, BaseSchemaFactory } from '../../../common/entities';
import { User } from '../../users/entities';
import { TaskPriority, TaskStatus } from '../enums';

@Schema()
export class Task extends BaseSchema {
  @Prop({ required: true, minlength: 3, maxlength: 255 })
  title: string;

  @Prop({ required: false, maxlength: 5000 })
  description?: string;

  @Prop({ required: true, enum: TaskStatus, default: TaskStatus.TODO })
  status: TaskStatus;

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ required: true, enum: TaskPriority })
  priority: TaskPriority;

  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  userId: string;

  @Prop({ required: true, type: String, ref: User.name })
  projectId: string;
}

export const TaskEntity = SchemaFactory.createForClass(Task);
TaskEntity.add(BaseSchemaFactory);
