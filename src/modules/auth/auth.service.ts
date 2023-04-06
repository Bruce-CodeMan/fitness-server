/*
 * @Date: 2023-04-06 13:25:39
 * @Author: Bruce
 * @Description: 
 */
import { Injectable } from "@nestjs/common";
import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import Util, * as $Util from '@alicloud/tea-util';
import { getRandomCode } from "src/shared/utils";
import { SIGN_NAME, TEMPLATE_CODE } from "src/common/constants/aliyun";

@Injectable()
export class AuthService {
    constructor(){}

    // 发送短信验证码
    async sendCodeMsg(tel: string): Promise<String> {
        const code = getRandomCode();
        const config = new $OpenApi.Config({
            // 必填，您的 AccessKey ID
            accessKeyId: '',
            // 必填，您的 AccessKey Secret
            accessKeySecret: '',
        });
        // 访问的域名
        config.endpoint = `dysmsapi.aliyuncs.com`;
        const client = new Dysmsapi20170525(config);
        const sendSmsRequest = new $Dysmsapi20170525.SendSmsRequest({
        signName: SIGN_NAME,
        templateCode: TEMPLATE_CODE,
        phoneNumbers: tel,
        templateParam: code,
        });
        const runtime = new $Util.RuntimeOptions({ });
        try {
        // 复制代码运行请自行打印 API 的返回值
        await client.sendSmsWithOptions(sendSmsRequest, runtime);
        } catch (error) {
        // 如有需要，请打印 error
        Util.assertAsString(error.message);
        }  
        return '';
    }
}