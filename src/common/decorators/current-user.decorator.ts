/*
 * @Date: 2023-04-17 09:30:36
 * @Author: Bruce
 * @Description: 
 */
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const CurUserId = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context);
        const userId = ctx.getContext().req.user.id;
        return userId;
    }
)