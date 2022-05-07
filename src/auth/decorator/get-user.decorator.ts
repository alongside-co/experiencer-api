import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';

export const GetUser = createParamDecorator(
  (key: (keyof User | '_id') | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    if (key) {
      return request.user[key];
    }
    return request.user;
  },
);
