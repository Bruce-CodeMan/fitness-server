/*
 * @Date: 2023-04-06 13:25:39
 * @Author: Bruce
 * @Description: 
 */
import { Injectable } from "@nestjs/common";
import Dysmsapi20170525, * as Dysmsapi from '@alicloud/dysmsapi20170525';
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
import * as OpenApi from '@alicloud/openapi-client';
import Util, * as Utils from '@alicloud/tea-util';
import { getRandomCode } from "src/shared/utils";
import { ACCESS_KEY, ACCESS_KEY_SECRET, SIGN_NAME, TEMPLATE_CODE } from "src/common/constants/aliyun";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){}

    // 发送短信验证码
    async sendCodeMsg(tel: string): Promise<boolean> {
        const code = getRandomCode();
        const config = new OpenApi.Config({
            // 必填，您的 AccessKey ID
            accessKeyId: ACCESS_KEY,
            // 必填，您的 AccessKey Secret
            accessKeySecret: ACCESS_KEY_SECRET,
        });
        // 访问的域名
        config.endpoint = 'dysmsapi.aliyuncs.com';
        const client = new Dysmsapi20170525(config);
        const sendSmsRequest = new Dysmsapi.SendSmsRequest({
            signName: SIGN_NAME,
            templateCode: TEMPLATE_CODE,
            phoneNumbers: tel,
            templateParam: `{\"code\":\"${code}\"}`,
        });
        const runtime = new Utils.RuntimeOptions({ });
        try {
            // 复制代码运行请自行打印 API 的返回值
            await client.sendSmsWithOptions(sendSmsRequest, runtime);
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