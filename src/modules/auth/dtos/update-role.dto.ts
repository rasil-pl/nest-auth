import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { Role } from '../../users/enums';

export class UpdateUserRoleDto {
  @ApiProperty({
    example: 'abc-def-ghi',
    description: "User's ID whose role you want to change",
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    enum: Role,
  })
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
