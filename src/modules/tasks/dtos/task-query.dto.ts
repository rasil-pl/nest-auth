import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsISO8601,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { SortDirection } from '../../../common/enums';
import { TaskPriority, TaskStatus } from '../enums';

export class TaskQueryDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 10;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  projectId: string;

  @ApiPropertyOptional({ enum: TaskStatus })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional({ enum: TaskPriority })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  startDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  endDate?: Date;

  @ApiPropertyOptional({ example: 'createdAt' })
  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({ enum: SortDirection, default: SortDirection.DESC })
  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection?: SortDirection = SortDirection.DESC;
}
