import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const LoggedUserRequest = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest()?.user;
  }
);
