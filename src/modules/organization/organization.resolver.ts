/*
 * @Date: 2023-04-18 08:56:27
 * @Author: Bruce
 * @Description: 
 */
import { ORGANIZATION_CREATE_FAILED, ORGIMAGE_DELETE_FAILED, SUCCESS, UPDATE_ERR } from "@/common/constants/code";
import { PageInput } from "@/common/dto/page-input.type";
import { Result } from "@/common/dto/result.type";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ORGANIZATION_NOT_EXIST } from "../../common/constants/code";
import { OrgImageService } from "../orgImage/orgImage.service";
import { OrganizationInput } from "./dto/organization-input.type";
import { OrganizationResult, OrganizationResults } from "./dto/organization-output.type";
import { OrganizationService } from "./organization.service";

@Resolver()
export class OrganizationResolver {
    constructor(
        private readonly organizationService: OrganizationService,
        private readonly orgImageService: OrgImageService
    ){}
    
    /**
     * 通过门店的ID查询信息
     * @param id 传入Organization的ID
     * @returns OrganizationResult
     */
    @Query(() => OrganizationResult)
    async getOrganizationInfo(@Args('id') id: string): Promise<OrganizationResult> {
        const result = await this.organizationService.findById(id)
        if(result) {
            return {
                code: SUCCESS,
                data: result,
                message: '获取成功'
            }
        }
        return {
            code: ORGANIZATION_NOT_EXIST,
            message: '门店信息不存在'
        }
    }

    /**
     * 新增/修改门店信息
     * @param params Organization的输入实体
     * @param userId 用户的ID
     * @param id 门店的ID,可选,如果存在说明是修改操作,如果不存在说明是创建操作
     * @returns 
     */
    @Mutation(() => OrganizationResult)
    async commitOrganization(
        @Args('params') params: OrganizationInput,
        // @CurUserId() userId: string,
        @Args('id', { nullable: true }) id?: string
    ): Promise<Result> {
        if(id) {
            const organization = await this.organizationService.findById(id);
            if(!organization) {
                return {
                    code: ORGANIZATION_NOT_EXIST,
                    message: '门店信息不存在'
                }
            }
            const delRes = await this.orgImageService.deleteByOrg(id);
            if(!delRes) {
                return {
                    code: ORGIMAGE_DELETE_FAILED,
                    message: '图片删除不成功,无法更新门店信息'
                }
            }
            const res = await this.organizationService.updateById(id, {
                ...params,
                updatedBy: "b4b10763-8215-4dc7-b6be-a94bade65b49"
            });
            if(res) {
                return {
                    code: SUCCESS,
                    message: '门店信息更新成功'
                }
            }
            return {
                code: UPDATE_ERR,
                message: '门店信息更新失败'
            }
        }
        // 开始创建门店信息
        const res = await this.organizationService.create({
            ...params,
            createdAt: "b4b10763-8215-4dc7-b6be-a94bade65b49"
        })
        if (res) {
            return {
                code: SUCCESS,
                message: '创建成功'
            }
        }
        return {
            code: ORGANIZATION_CREATE_FAILED,
            message: '创建门店信息失败'
        }
    }

    /**
     * 分页获取门店信息
     * @param page pageNum: 起始页, pageSize: 每页数目
     * @returns 
     */
    @Query(() => OrganizationResults)
    async getOrganizations(@Args('page') page: PageInput): Promise<OrganizationResults> {
        const { pageNum, pageSize } = page;
        const [ results, total ] = await this.organizationService.findOrganizations({
            start: (pageNum - 1) * pageSize + 1,
            length: pageSize
        })
        return {
            code: SUCCESS,
            data: results,
            page: {
                pageNum,
                pageSize,
                total
            },
            message: '获取成功'
        }
    }
}