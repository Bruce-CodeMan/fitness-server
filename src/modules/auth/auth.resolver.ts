/*
 * @Date: 2023-04-06 13:27:23
 * @Author: Bruce
 * @Description: 
 */
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import * as dayjs from "dayjs";
import { Result } from "src/common/dto/result.type";
import { ACCOUNT_NOT_EXIST, CODE_EXPIRE, CODE_NOT_EXIST, LOGIN_ERR, SUCCESS } from "src/common/constants/code";

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService,
                private readonly userService: UserService){}

    @Mutation(() => Result, { description: '发送短信验证码' })
    async sendCodeMsg(
        @Args('tel')tel: string
    ): Promise<Result>{
        return await this.authService.sendCodeMsg(tel);
    }

    @Mutation(() => Result, { description: "登录" })
    async login(
        @Args('tel') tel: string, 
        @Args('code') code: string
    ): Promise<Result> {
        const user = await this.userService.findByTel(tel)
        if(!user) {
            return {
                code: ACCOUNT_NOT_EXIST,
                message: "account is not exsited"
            };
        }
        if (!user.codeCreatetime || !user.code){
            return {
                code: CODE_NOT_EXIST,
                message: "code is not existed"
            };
        }
        if(dayjs().diff(dayjs(user.codeCreatetime)) > 60 * 60 * 1000) {
            return {
                code: CODE_EXPIRE,
                message: "code expired"
            };
        }
        if (user.code === code) {
            return {
                code: SUCCESS,
                message: "login success"
            };
        }
        return {
            code: LOGIN_ERR,
            message: "login ERR, phone number or code is wrong"
        };
    }
}