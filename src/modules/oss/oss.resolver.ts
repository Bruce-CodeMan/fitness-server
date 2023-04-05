import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class OSSResolver {
    constructor(private readonly ossService: any){}

    @Query(() => String, { description: '获取oss相关信息' })
    async find(@Args('id') id: string): Promise<string> {
        return await this.ossService.find(id);
    }
}