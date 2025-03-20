import { createParamDecorator } from '@nestjs/common';

import { AuthenticatedRequest } from '../../types';

export const CurrentUser = createParamDecorator(
  (data: keyof AuthenticatedRequest['user'] | undefined, ctx) => {
    const request = ctx
      .switchToHttp()
      .getRequest() satisfies AuthenticatedRequest;
    return data ? request.user[data] : request.user;
  },
);
