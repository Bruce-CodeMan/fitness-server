/*
 * @Date: 2023-03-31 14:41:24
 * @Author: Bruce
 * @Description: 
 */
import { Args, Query, Mutation, Resolver, Context } from "@nestjs/graphql";
import { UserInput } from "./dto/user-input.type";
import { UserType } from "./dto/user.type";
import { UserService } from "./user.service";
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/common/guards/auth.guards';
import { Result } from "@/common/dto/result.type";
import { SUCCESS, UPDATE_ERR } from "@/common/constants/code";


@Resolver()
@UseGuards(GqlAuthGuard)
export class UserResolver {
    constructor(private readonly userService: UserService){}

    // 创建一个用户
    @Mutation(() => Boolean)
    async create(
        @Args('params'
    ) params: UserInput): Promise<boolean> {
        return await this.userService.create(params);
    }

    // 通过ID查询一个用户
    @Query(() => UserType, { description: "通过 ID 查询用户" })
    async find(@Args('id') id: string): Promise<UserType> {
        return await this.userService.findOne(id);
    }

    // 通过ID查询一个用户
    @Query(() => UserType, { description: "使用 ID 查询用户" })
    async getUserInfo(@Context() ctx: any): Promise<UserType> {
        const id = ctx.req.user.id;
        return await this.userService.findOne(id);
    }

    // 通过ID更新一个用户
    @Mutation(() => Result, { description: "通过 ID 更新用户" })
    async update(
        @Args('id') id: string,
        @Args('params') params: UserInput
    ): Promise<Result> {
        const res =  await this.userService.update(id, params);
        if(res) {
            return {
                code: SUCCESS,
                message: "更新成功"
            }   
        }
        return {
            code: UPDATE_ERR,
            message: "更新失败"
        }
    }

    // 通过ID删除一个用户
    @Mutation(() => Boolean, { description: "通过 ID 删除用户" })
    async del(
        @Args('id') id: string
    ): Promise<boolean> {
        return await this.userService.del(id);
    }
}