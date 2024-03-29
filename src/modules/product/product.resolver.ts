import { Args, Query, Resolver, Mutation } from "@nestjs/graphql";

import { ProductType } from "./dto/product.type";
import { ProductService } from "./product.service";
import { ProductResult, ProductResults } from "./dto/result-product.output";
import { PRODUCT_CREATE_FAIL, PRODUCT_DEL_FAIL, PRODUCT_NOT_EXIST, PRODUCT_UPDATE_FAIL, SUCCESS } from "@/common/constants/code";
import { PartialProductInput } from "./dto/product.input";
import { CurUserId } from "@/common/decorators/current-user.decorator";
import { CurOrgId } from "@/common/decorators/current-org.decorator";
import { Result } from "@/common/dto/result.type";
import { ProductStatus } from "@/common/constants/enum";
import { PageInput } from "@/common/dto/page-input.type";
import { FindOptionsWhere, Like } from "typeorm";
import { Product } from "./models/product.entity";

@Resolver(() => ProductType)
export class ProductResolver {
    constructor(private readonly productService: ProductService){}


    @Query(() => ProductResult)
    async getProductInfo(@Args("id") id: string): Promise<ProductResult> {
        const result = await this.productService.findById(id);
        if(result) {
            return {
                code: SUCCESS,
                data: result,
                message: "获取成功"
            }
        }
        return {
            code: PRODUCT_NOT_EXIST,
            message: "获取信息不存在"
        }
    }

    @Mutation(() => ProductResult)
    async commitProductInfo(
        @Args("params") params: PartialProductInput,
        @CurUserId() userId: string,
        @CurOrgId() orgId: string,
        @Args("id", { nullable: true }) id: string
    ): Promise<Result> {
        if(!id) {
            const res = await this.productService.createProduct({
                ...params,
                createdBy: userId,
                cards: [],
                // 初始化当前的库存为总库存
                curStock: params.stock,
                status: ProductStatus.UN_LIST,
                org: {
                    id: orgId
                }
            })
            if(res) {
                return {
                    code: SUCCESS,
                    message: "创建成功"
                }
            }
            return {
                code: PRODUCT_CREATE_FAIL,
                message: "创建失败"
            }
        }
        const product = await this.productService.findById(id)
        if(product) {
            const newProduct = {
                ...params,
                cards: [],
                updatedBy: userId
            }
            if(params.cards && params.cards?.length > 0) {
                newProduct.cards = params.cards.map((item) => ({
                    id: item
                }))
            } else {
                // 防止消费卡被清空
                newProduct.cards = product.cards
            }
            const res = await this.productService.updateById(product.id, newProduct)
            if(res) {
                return {
                    code: SUCCESS,
                    message: "更新成功"
                }
            }
            return {
                code: PRODUCT_UPDATE_FAIL,
                message: "更新失败"
            }
        }
        return {
            code: PRODUCT_NOT_EXIST,
            message: "商品信息不存在"
        }
    }

    @Query(() => ProductResults)
    async getProducts(
        @Args('page') page: PageInput,
        @CurUserId() userId: string,
        @CurOrgId() orgId: string,
        @Args("name", { nullable: true }) name?: string
    ): Promise<ProductResults> {
        const { pageNum, pageSize } = page;
        const where: FindOptionsWhere<Product> = { createdBy: userId }
        if(name) {
            where.name = Like(`%${name}%`)
        }
        if(orgId){
            where.org = {
                id: orgId
            }
        }
        const [results, total] = await this.productService.findProducts({
            start: (pageNum -1)*pageSize,
            length: pageSize,
            where
        })
        return {
            code: SUCCESS,
            data: results,
            page: {
                pageNum,
                pageSize,
                total
            },
            message: "获取成功"
        }
    }

    @Mutation(() => Result) 
    async deleteProduct(
        @Args("id") id: string,
        @CurUserId() userId: string
    ): Promise<Result> {
        const result = await this.productService.findById(id)
        if(result) {
            const delRes = await this.productService.deleteById(id, userId)
            if(delRes) {
                return {
                    code: SUCCESS,
                    message: "删除成功"
                }
            }
            return {
                code: PRODUCT_DEL_FAIL,
                message: "删除失败"
            }
        }
        return {
            code: PRODUCT_NOT_EXIST,
            message: "商品信息不存在"
        }
    }
}