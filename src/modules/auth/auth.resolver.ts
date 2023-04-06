/*
 * @Date: 2023-04-06 13:27:23
 * @Author: Bruce
 * @Description: 
 */
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService){}

    @Mutation(() => String, { description: '发送短信验证码' })
    async sendCodeMsg(@Args('tel')tel: string): Promise<String>{
        return await this.authService.sendCodeMsg(tel);
    }
}