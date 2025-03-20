import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { BaseDto } from '../../../common/dtos';

export class ProjectDto extends BaseDto {
  @Expose() @ApiProperty() name: string;
  @Expose() @ApiProperty() description: string;
  @Expose() @ApiProperty() startDate: Date;
  @Expose() @ApiProperty() endDate: Date;
  @Expose() @ApiProperty() userId: string;
}
