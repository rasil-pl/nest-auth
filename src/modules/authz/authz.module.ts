import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './strategies';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'authz-jwt' })],
  providers: [JwtStrategy],
  exports: [PassportModule],
})
export class AuthzModule {}
