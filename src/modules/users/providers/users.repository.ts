import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, RootFilterQuery } from 'mongoose';

import { CreateUserDto } from '../dtos';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.create(createUserDto);
  }

  async createMany(createUsersDto: CreateUserDto[]) {
    const bulkOps = createUsersDto.map((user) => ({
      updateOne: {
        filter: { email: user.email },
        update: { $set: user },
        upsert: true,
      },
    }));
    await this.userModel.insertMany(bulkOps);
  }

  async findOne(findOneUserDto: Partial<User>): Promise<User | null> {
    return await this.userModel.findOne(findOneUserDto).exec();
  }

  async update(
    filter: RootFilterQuery<User>,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    return await this.userModel
      .findOneAndUpdate(filter, updateUserDto, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }
}
