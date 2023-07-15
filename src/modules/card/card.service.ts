import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";


// Custom Impors
import { Card } from "./models/card.entity";

@Injectable()
export class CardService {
    constructor(
        @InjectRepository(Card)
        private readonly cardRepository: Repository<Card> 
    ){}

    // 创建消费卡
    async create(entity: DeepPartial<Card>): Promise<boolean> {
        const res = this.cardRepository.save(
            this.cardRepository.create(entity)
        )
        if(res) {
            return true;
        }
        return false
    }

    // 通过id查找消费卡
    async findById(id: string): Promise<Card> {
        return this.cardRepository.findOne({
            where: {
                id,
            },
            relations:['course', 'organization']
        })
    }

    // 通过id更新消费卡
    async updateById(id: string, entity: DeepPartial<Card>): Promise<boolean> {
        const existEntity = await this.findById(id);
        if(!existEntity) {
            return false;
        }
        Object.assign(existEntity, entity)
        const res = await this.cardRepository.save(existEntity);
        if(res) {
            return true;
        }
        return false
    }

    // 查询消费卡
    async findCards({where}: {where: FindOptionsWhere<Card>}): Promise<[Card[], number]> {
        return this.cardRepository.findAndCount({
            where,
            order: {
                createdAt: 'DESC'
            },
            relations: ['course']
        })
    }

    // 通过id删除消费卡
    async deleteById(id: string, userId: string): Promise<boolean> {
        const res_1 = await this.cardRepository.update(id, {
            deletedBy: userId,
        })
        if(res_1) {
            const res = await this.cardRepository.softDelete(id);
            if(res.affected > 0) {
                return true;
            }
        }
        return false;
    }
}