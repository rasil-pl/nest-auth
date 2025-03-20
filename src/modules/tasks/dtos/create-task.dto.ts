import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { TaskPriority, TaskStatus } from '../enums';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Task 1',
    description: 'Task title',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  title: string;

  @ApiProperty({
    required: false,
    example: 'Task description',
    description: 'A brief description about the task',
  })
  @IsString()
  @IsOptional()
  @MaxLength(5000)
  description?: string;

  @ApiProperty({ enum: TaskStatus })
  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: TaskStatus;

  @ApiProperty({
    example: '2025-02-21T22:00:00.000Z',
    description: 'Due date of the task',
  })
  @IsISO8601()
  @IsNotEmpty()
  dueDate: Date;

  @ApiProperty({ enum: TaskPriority })
  @IsEnum(TaskPriority)
  @IsNotEmpty()
  priority: TaskPriority;

  @ApiProperty({ example: 'abc' })
  @IsString()
  @IsNotEmpty()
  projectId: string;
}
