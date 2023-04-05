import { Query, Resolver } from '@nestjs/graphql';
import { OssType } from './dto/oss.type';
import { OSSService } from './oss.service';

@Resolver()
export class OSSResolver {
    constructor(private readonly ossService: OSSService){}

    @Query(() => OssType, { description: '获取oss相关信息' })
    async getOSSInfo(): Promise<OssType> {
        return await this.ossService.getSignature();
    }
}

