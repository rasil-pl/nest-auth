import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserEntity } from './entities';
import { UsersRepository, UsersService } from './providers';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserEntity }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, Logger],
  exports: [UsersService],
})
export class UsersModule {}
