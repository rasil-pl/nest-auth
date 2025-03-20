import { SetMetadata } from '@nestjs/common';

import { Role } from '../../modules/users/enums';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
