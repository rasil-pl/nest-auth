import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ example: 'Example Project' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({
    example: 'This is an example description about the project',
  })
  @IsString()
  @IsOptional()
  @MaxLength(5000)
  description?: string;

  @ApiPropertyOptional({ example: '2025-02-25T12:00:00.000Z' })
  @IsISO8601()
  @IsOptional()
  startDate?: Date;

  @ApiPropertyOptional({ example: '2025-03-25T12:00:00.000Z' })
  @IsISO8601()
  @IsOptional()
  endDate: Date;
}
