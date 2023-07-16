import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";

// Custom Imports
import { Product } from "./models/product.entity";


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ){}

    // 创建商品
    async createProduct(entity: DeepPartial<Product>): Promise<boolean> {
        const res = this.productRepository.save(
            this.productRepository.create(entity)
        )

        if(res) {
            return true
        }
        return false
    }

    // 通过id查询商品
    async findById(id: string): Promise<Product> {
        return this.productRepository.findOne({
            where: {
                id
            },
            relations: ['org', 'cards', 'cards.course']
        })
    }

    // 获取数量
    async getCount(options) {
        return this.productRepository.count(options)
    }

    // 通过id更新商品
    async updateById(id: string, entity: DeepPartial<Product>): Promise<boolean> {
        const existEntity = await this.findById(id);
        if(!existEntity) {
            return false
        }
        Object.assign(existEntity, entity);
        const res = await this.productRepository.save(existEntity);
        if(res) {
            return true;
        }
        return false;
    }

    // 分页获取商品信息
    async findProducts({
        start,
        length,
        where
    }: {
        start: number;
        length: number;
        where: FindOptionsWhere<Product>
    }): Promise<[Product[], number]> {
        return this.productRepository.findAndCount({
            take: length,
            skip: start,
            where,
            order: {
                createdAt: "DESC"
            },
            relations: ['org']
        })
    }

    // 通过id删除商品
    async DeleteQueryBuilder(id: string, userId: string): Promise<boolean> {
        const res_1 = await this.productRepository.update(id, {
            deletedBy: userId
        })
        if(res_1) {
            const res = await this.productRepository.softDelete(id);
            if(res.affected > 0) {
                return true
            }
        }
        return false;
    }
}