import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UnauthorizedErrorDto {
  @Expose() @ApiProperty({ example: 'Unauthorized' }) message: string;
  @Expose() @ApiProperty({ example: 401 }) statusCode: number;
}

export class BadRequestErrorDto {
  @Expose() @ApiProperty({ example: 'Bad Request' }) message: string;
  @Expose() @ApiProperty({ example: 404 }) statusCode: number;
}

export class ConflictErrorDto {
  @Expose() @ApiProperty({ example: 'Conflict' }) message: string;
  @Expose() @ApiProperty({ example: 409 }) statusCode: number;
}
