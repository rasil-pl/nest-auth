import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { AuthenticatedRequest } from '../../../types';
import { Role } from '../../users/enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }
    const request: AuthenticatedRequest = context.switchToHttp().getRequest();
    const user = request?.user;
    if (!user) {
      return false;
    }

    const hasPermissions = requiredRoles.includes(user.role);
    if (!hasPermissions) {
      throw new ForbiddenException('Access denied');
    }
    return true;
  }
}
