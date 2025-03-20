import { Request } from 'express';

import { Role } from '../modules/users/enums';

export type RequestCurrentUser = {
  id: string;
  email: string;
  role: Role;
};

export interface AuthenticatedRequest extends Request {
  user: RequestCurrentUser;
}
