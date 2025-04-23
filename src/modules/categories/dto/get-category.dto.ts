import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetCategoryQueryDto {
  @ApiProperty({ example: 10 })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  limit: number = 10;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  page: number = 1;
}

export class GetCategoryResponseDto {
  @Expose()
  _id: string;

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
}

export class PaginationMetaDto {
  @ApiProperty({ example: 1 })
  @Expose()
  page: number;

  @Expose()
  @ApiProperty({ example: 10 })
  limit: number;

  @Expose()
  @ApiProperty({ example: 30 })
  total: number;

  @Expose()
  @ApiProperty({ example: 3 })
  totalPages: number;
}

export class GetCategoriesResponseDto {
  @Expose()
  @Type(() => GetCategoryResponseDto)
  categories: GetCategoryResponseDto[];

  @Expose()
  @Type(() => PaginationMetaDto)
  meta: PaginationMetaDto;
}
