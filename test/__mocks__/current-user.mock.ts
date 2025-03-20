import { Role } from '../../src/modules/users/enums';
import { RequestCurrentUser } from '../../src/types';

const mockUser = {
  id: 'mock-current-user-id',
  email: 'mock@user.com',
};

export const mockCurrentUser = {
  ...mockUser,
  role: Role.USER,
} satisfies RequestCurrentUser;

export const mockCurrentAdminUser = {
  ...mockUser,
  role: Role.ADMIN,
} satisfies RequestCurrentUser;
