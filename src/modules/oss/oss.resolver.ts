/*
 * @Date: 2023-04-06 13:23:17
 * @Author: Bruce
 * @Description: 
 */
import { Query, Resolver } from '@nestjs/graphql';
import { OssType } from './dto/oss.type';
import { OSSService } from './oss.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/common/guards/auth.guards';

@Resolver()
@UseGuards(GqlAuthGuard)
export class OSSResolver {
    constructor(private readonly ossService: OSSService){}

    @Query(() => OssType, { description: '获取oss相关信息' })
    async getOSSInfo(): Promise<OssType> {
        return await this.ossService.getSignature();
    }
}

