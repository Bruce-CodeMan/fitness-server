/*
 * @Date: 2023-03-31 14:41:24
 * @Author: Bruce
 * @Description: 
 */
import { Args, Query, Mutation, Resolver } from "@nestjs/graphql";
import { UserInput } from "./dto/user-input.type";
import { UserType } from "./dto/user.type";
import { UserService } from "./user.service";

@Resolver()
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

    // 通过ID更新一个用户
    @Mutation(() => Boolean, { description: "通过 ID 更新用户" })
    async update(
        @Args('id') id: string,
        @Args('params') params: UserInput
    ): Promise<boolean> {
        return await this.userService.update(id, params);
    }
}