import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Electronics' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({ example: 'All the tech related stuff' })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description: string;

  @ApiPropertyOptional({ example: 'https://placehold.co/128x128/png' })
  @IsString()
  @IsOptional()
  imageUrl: string;
}

export class CreateCategoryResponseDto {
  @Expose()
  @ApiProperty({ example: '1cb43716-c96e-4d8c-9b5c-9290e311ae71' })
  uuid: string;

  @Expose()
  @ApiProperty({ example: 'Electronics' })
  name: string;

  @Expose()
  @ApiProperty({ example: 'This is electronics category' })
  description: string;

  @Expose()
  @ApiProperty({ example: 'https://placehold.co/128x128/png' })
  imageUrl: string;

  @Expose()
  @ApiProperty({ example: '2025-03-27T12:00:00.000Z' })
  createdAt: Date;

  @Expose()
  @ApiProperty({ example: '2025-03-27T12:00:00.000Z' })
  updatedAt: Date;
}
