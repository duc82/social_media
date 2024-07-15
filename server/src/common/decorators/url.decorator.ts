import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const Url = createParamDecorator((_data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();

  const url = `${req.protocol}://${req.get("host")}`;

  return url;
});
