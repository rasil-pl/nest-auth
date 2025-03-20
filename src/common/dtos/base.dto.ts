import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BaseDto {
  @Expose() @ApiProperty() uuid: string;
  @Expose() @ApiProperty() createdAt: Date;
  @Expose() @ApiProperty() updatedAt: Date;
}
