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

    @Mutation(() => Boolean)
    async create(@Args('params') params: UserInput): Promise<boolean> {
        return await this.userService.create(params);
    }

    @Query(() => UserType, { description: "通过 ID 查询用户" })
    async find(@Args('id') id: string): Promise<UserType> {
        return await this.userService.findOne(id);
    }
}