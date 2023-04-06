/*
 * @Date: 2023-04-06 13:25:39
 * @Author: Bruce
 * @Description: 
 */
import { Injectable } from "@nestjs/common";
import * as Dysmsapi from '@alicloud/dysmsapi20170525';
import Util, * as Utils from '@alicloud/tea-util';
import { getRandomCode } from "src/shared/utils";
import { SIGN_NAME, TEMPLATE_CODE } from "src/common/constants/aliyun";
import { msgClient } from "src/shared/utils/msg";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){}

    // 发送短信验证码
    async sendCodeMsg(tel: string): Promise<boolean> {
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
                    return true;
                }else {
                    return false;
                }
            }
            const result = await this.userService.create({tel, code, codeCreatetime: new Date()})
            if(result){
                return true;
            }else{
                return false;
            }
        } catch (error) {
            // 如有需要，请打印 error
            Util.assertAsString(error.message);
        }  
    }
}