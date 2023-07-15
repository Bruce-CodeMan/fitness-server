import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";

// Custom Imports
import { CardType } from "./dto/card.type";
import { CardService } from "./card.service";
import { CardResult, CardResults } from "./dto/result-card.output";
import { CARD_CREATE_FAIL, CARD_DELETE_FAIL, CARD_NOT_EXIST, CARD_UPDATE_FAIL, SUCCESS } from "@/common/constants/code";
import { CardInput } from "./dto/card.input";
import { CurUserId } from "@/common/decorators/current-user.decorator";
import { CurOrgId } from "@/common/decorators/current-org.decorator";
import { Result } from "@/common/dto/result.type";
import { FindOptionsWhere, Like } from "typeorm";
import { Card } from "./models/card.entity";

@Resolver(() => CardType)
export class CardResolver {
    constructor(
        private readonly cardService: CardService
    ){}

    /**
     * 获取消费卡信息
     * @param id 消费卡的id
     * @returns CardResult
     */
    @Query(() => CardResult)
    async getCardInfo(@Args("id") id: string): Promise<CardResult> {
        const result = await this.cardService.findById(id);
        if(result) {
            return {
                code: SUCCESS,
                data: result,
                message: "获取成功"
            }
        }
        return {
            code: CARD_NOT_EXIST,
            message: "消费卡信息不存在"
        }
    }

    /**
     * 创建 / 更新消费卡信息
     * @param params 消费卡的输入
     * @param courseId 课程的id
     * @param userId 用户的id
     * @param orgId 组织的id
     * @param id 消费卡id
     * @returns 
     */
    @Mutation(() => CardResult)
    async commitCardInfo(
        @Args("params") params: CardInput,
        @Args("courseId") courseId: string,
        @CurUserId() userId: string,
        @CurOrgId() orgId: string,
        @Args("id", { nullable: true }) id: string
    ): Promise<Result> {
        if(!id) {
            const res = await this.cardService.create({
                ...params,
                org: {
                    id: orgId
                },
                course: {
                    id: courseId,
                },
                createdBy: userId
            })
            if(res) {
                return {
                    code: SUCCESS,
                    message: "创建成功"
                }
            }
            return {
                code: CARD_CREATE_FAIL,
                message: "创建失败"
            }
        }
        const card = await this.cardService.findById(id);
        if(card) {
            const res = await this.cardService.updateById(card.id, {
                ...params,
                updatedBy: userId
            })
            if(res) {
                return {
                    code: SUCCESS,
                    message: "更新成功"
                }
            }
            return {
                code: CARD_UPDATE_FAIL,
                message: "更新失败"
            }
        }
        return {
            code: CARD_NOT_EXIST,
            message:" 消费卡信息不存在"
        }
    }

    /**
     * 获取消费卡
     * @param courseId 课程id 
     * @param userId 用户id
     * @param name 消费卡名称
     * @returns 
     */
    @Query(() => CardResults)
    async getCards(
        @Args("courseId") courseId: string,
        @CurUserId() userId: string,
        @Args("name", { nullable: true }) name?: string
    ): Promise<CardResults> {
        const where: FindOptionsWhere<Card> = {
            createdBy: userId,
            course: {
                id: courseId
            }
        }
        if(name) {
            where.name = Like(`%${name}%`)
        }
        const [results] = await this.cardService.findCards({
            where
        })
        return {
            code: SUCCESS,
            data: results,
            message: "获取成功"
        }
    }

    @Mutation(() => Result)
    async deleteCard(
        @Args("id") id: string,
        @CurUserId() userId: string
    ): Promise<Result> {
        const result = await this.cardService.findById(id)
        if(result) {
            const delRes = await this.cardService.deleteById(id, userId)
            if(delRes){
                return {
                    code: SUCCESS,
                    message: "删除成功"
                }
            }
            return {
                code: CARD_DELETE_FAIL,
                message: "删除失败"
            }
        }
        return {
            code: CARD_NOT_EXIST,
            message: "消费卡信息不存在"
        }
    }
}