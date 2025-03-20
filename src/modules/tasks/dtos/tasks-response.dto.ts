import { Expose, Type } from 'class-transformer';

import { TaskPriority, TaskStatus } from '../enums';

export class TasksPaginationMetaDto {
  @Expose()
  page: number;

  @Expose()
  limit: number;

  @Expose()
  total: number;

  @Expose()
  totalPages: number;
}

export class TaskResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  status: TaskStatus;

  @Expose()
  dueDate: Date;

  @Expose()
  priority: TaskPriority;

  @Expose()
  userId: string;

  @Expose()
  projectId: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

export class TasksResponseDto {
  @Type(() => TaskResponseDto)
  @Expose()
  data: TaskResponseDto[];

  @Type(() => TasksPaginationMetaDto)
  @Expose()
  meta: TasksPaginationMetaDto;
}
