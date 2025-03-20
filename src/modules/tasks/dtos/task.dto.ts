import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { BaseDto } from '../../../common/dtos';
import { TaskPriority, TaskStatus } from '../enums';

export class TaskDto extends BaseDto {
  @Expose() @ApiProperty() title: string;
  @Expose() @ApiProperty() description: string;
  @Expose() @ApiProperty() status: TaskStatus;
  @Expose() @ApiProperty() dueDate: Date;
  @Expose() @ApiProperty() priority: TaskPriority;
  @Expose() @ApiProperty() userId: string;
  @Expose() @ApiProperty() projectId: string;
}

export class TaskPaginationDto {
  @Expose() @ApiProperty() page: number;
  @Expose() @ApiProperty() limit: number;
  @Expose() @ApiProperty() total: number;
  @Expose() @ApiProperty() totalPages: number;
}

export class TasksDto {
  @Expose()
  @Type(() => TaskDto)
  @ApiProperty({ type: TaskDto, isArray: true })
  data: TaskDto[];

  @Expose()
  @Type(() => TaskPaginationDto)
  @ApiProperty({ type: TaskPaginationDto })
  meta: TaskPaginationDto;
}
