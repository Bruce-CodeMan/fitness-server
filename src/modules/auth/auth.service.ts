/*
 * @Date: 2023-04-06 13:25:39
 * @Author: Bruce
 * @Description: 
 */
import { Injectable } from "@nestjs/common";
import * as Dysmsapi from '@alicloud/dysmsapi20170525';
import Util, * as Utils from '@alicloud/tea-util';
import { getRandomCode } from "@/shared/utils";
import { SIGN_NAME, TEMPLATE_CODE } from "@/common/constants/aliyun";
import { msgClient } from "@/shared/utils/msg";
import { UserService } from "../user/user.service";
import * as dayjs from 'dayjs';
import { Result } from "@/common/dto/result.type";
import { CODE_NOT_EXPIRE, CREATE_ERR, SUCCESS, UPDATE_ERR } from "@/common/constants/code";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){}

    // 发送短信验证码
    async sendCodeMsg(tel: string): Promise<Result> {
        console.log("tel:", tel);
        // 拿到上次发送验证码的时间,查看间隔是否超过60秒
        const user = await this.userService.findByTel(tel);
        if(user) {
            const diffTime = dayjs().diff(dayjs(user.codeCreatetime))
            if(diffTime < 60 * 1000) {
                return {
                    code: CODE_NOT_EXPIRE,
                    message: "code is not expired"
                };
            }
        }

        const code = getRandomCode();
        
        const sendSmsRequest = new Dysmsapi.SendSmsRequest({
            signName: SIGN_NAME,
            templateCode: TEMPLATE_CODE,
            phoneNumbers: tel,
            templateParam: `{\"code\":\"${code}\"}`,
        });
        const runtime = new Utils.RuntimeOptions({ });
        try {
            // 复制代码运行请自行打印 API 的返回值
            await msgClient.sendSmsWithOptions(sendSmsRequest, runtime);
            // 发送成功之后
            const user = await this.userService.findByTel(tel);
            if(user) {
                const result = await this.userService.updateCode(user.id, code);
                if(result) {
                    return {
                        code: SUCCESS,
                        message:"success"
                    };
                }else {
                    return {
                        code: UPDATE_ERR,
                        message: "update code ERROR"
                    };
                }
            }
            const result = await this.userService.create({tel, code, codeCreatetime: new Date()})
            if(result){
                return {
                    code: SUCCESS,
                    message: "success"
                };
            }else{
                return {
                    code: CREATE_ERR,
                    message: "create new account ERR"
                };
            }
        } catch (error) {
            // 如有需要，请打印 error
            Util.assertAsString(error.message);
        }  
    }
}