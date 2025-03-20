import { PickType } from '@nestjs/swagger';

import { CreateUserDto } from '../../users/dtos';

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {}
