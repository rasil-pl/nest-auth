import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { CurrentUser, Roles } from '../../common/decorators';
import { RequestCurrentUser } from '../../types';
import { UpdateUserRoleDto } from '../auth/dtos';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { Role } from './enums';
import { UsersService } from './providers';

@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Roles(Role.ADMIN)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@CurrentUser() currentUser: RequestCurrentUser) {
    return this.usersService.findById(currentUser.id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('role')
  async updateUserRole(@Body() updateUserRoleDto: UpdateUserRoleDto) {
    return this.usersService.updateRole(updateUserRoleDto);
  }
}
