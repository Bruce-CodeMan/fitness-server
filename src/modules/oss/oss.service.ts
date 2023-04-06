import { Injectable } from "@nestjs/common";
import * as OSS from 'ali-oss';
import * as dayjs from 'dayjs';
import { OssType } from "./dto/oss.type";


@Injectable()
export class OSSService {

    // 获取签名
    async getSignature(): Promise<OssType> {
        const config = {
            accessKeyId: "xxx",
            accessKeySecret: "xxx",
            bucket: "fitness-nestjs",
            dir: "images/",
        }

        const client = new OSS(config);

        const date = new Date();
        date.setDate(date.getDate() + 1);

        const policy = {
            expiration: date.toISOString(), // 请求有效期
            conditions: [
              ["content-length-range", 0, 1048576000], // 设置上传文件的大小限制
              // { bucket: client.options.bucket } // 限制可上传的bucket
            ],
          };

        // 签名
        const formData = await client.calculatePostSignature(policy);
        // bucket域名
        const host = `http://${config.bucket}.${
            (await client.getBucketLocation()).location
        }.aliyuncs.com`.toString();

        // 返回参数
        const params = {
            expire: dayjs().add(1, "days").unix().toString(),
            policy: formData.policy,
            signature: formData.Signature,
            accessId: formData.OSSAccessKeyId,
            host
          };
        return params;
    }
}

