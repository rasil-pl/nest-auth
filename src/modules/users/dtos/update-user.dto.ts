import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

import { Role } from '../enums';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
