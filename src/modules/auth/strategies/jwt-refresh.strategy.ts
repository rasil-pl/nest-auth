import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

import { config } from '../../../config';
import { TokenKeys } from '../../../constants';
import { JwtPayload } from '../types';

const extractFromCookie = (req: Request) => {
  let token: string | null = null;
  if (req && req.cookies) {
    token = req.cookies[TokenKeys.REFRESH_TOKEN] as string | null;
  }
  return token;
};

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: extractFromCookie,
      ignoreExpiration: false,
      secretOrKey: config.jwt.secret,
    });
  }

  validate(payload: JwtPayload) {
    return { email: payload.email, id: payload.sub, role: payload.role };
  }
}
