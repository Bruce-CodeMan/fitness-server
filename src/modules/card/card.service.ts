import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";


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
}