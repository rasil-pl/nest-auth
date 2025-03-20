import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { config } from '../../../config';

export class JwtStrategy extends PassportStrategy(Strategy, 'authz-jwt') {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${config.auth0.issuerUrl}.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: config.auth0.audience,
      issuer: `${config.auth0.issuerUrl}`,
      algorithms: ['RS256'],
    });
  }

  validate(payload: unknown): unknown {
    return payload;
  }
}
