import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { UpdateUserRoleDto } from '../../auth/dtos';
import { CreateUserDto, CreateUserResponseDto } from '../dtos';
import { User } from '../entities';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly loggerService: Logger,
  ) {}

  async createMany(createUsersDto: CreateUserDto[]) {
    try {
      await this.usersRepository.createMany(createUsersDto);
    } catch (error) {
      this.loggerService.error('Error creating multiple users: ', error);
      throw new InternalServerErrorException('Error creating multiple users');
    }
  }

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    try {
      const user = await this.usersRepository.create(createUserDto);
      return plainToInstance(CreateUserResponseDto, user, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      this.loggerService.error('Error creating user: ', error);
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ email });
  }

  async findById(id: string): Promise<User | null> {
    return await this.usersRepository.findOne({ uuid: id });
  }

  async updateRole(updateUserRoleDto: UpdateUserRoleDto) {
    const { userId, role } = updateUserRoleDto;
    const updatedUser = await this.usersRepository.update(
      { uuid: userId },
      { role },
    );
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }
}
