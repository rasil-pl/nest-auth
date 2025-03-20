import { Role } from '../../users/enums/roles.enum';

export type JwtPayload = {
  email: string;
  sub: string;
  role: Role;
};

export interface DecodedJwtPayload extends JwtPayload {
  iat: number;
  exp: number;
}
