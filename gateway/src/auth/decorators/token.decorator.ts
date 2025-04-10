import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const Token = createParamDecorator(
    (_: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        if (!request.token) {
            throw new InternalServerErrorException("Token not found in request");
        } else {
            return request.token;
        }
    }
)