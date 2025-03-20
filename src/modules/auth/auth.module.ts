import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { config } from '../../config';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { RefreshToken, RefreshTokenEntity } from './entities';
import {
  AuthService,
  HashingService,
  RefreshTokenRepository,
  RefreshTokenService,
} from './providers';
import { JwtRefreshStrategy, JwtStrategy } from './strategies';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: config.jwt.secret,
    }),
    PassportModule,
    MongooseModule.forFeature([
      { name: RefreshToken.name, schema: RefreshTokenEntity },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    Logger,
    AuthService,
    HashingService,
    RefreshTokenService,
    RefreshTokenRepository,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
  exports: [HashingService],
})
export class AuthModule {}
