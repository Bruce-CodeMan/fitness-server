import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Organization } from "./models/organization.entity";
import { DeepPartial, Repository } from "typeorm";

@Injectable()
export class OrganizationService {
    
    constructor(
        @InjectRepository(Organization)
        private readonly organizationRepository: Repository<Organization>,
    ){}

    /**
     *  创建一个门店
     *  @param entity 门店的数据库实体
     *  @returns Boolean 
     */
    async create(entity: DeepPartial<Organization>): Promise<boolean> {
        const res = await this.organizationRepository.save(
            this.organizationRepository.create(entity)
        );
        if (res) {
            return true;
        }
        return false;
    }

    /**
     *  通过ID 获取门店信息
     *  @param id 数据库中门店的id索引
     *  @returns Organization 
     */
    async findById(id: string): Promise<Organization> {
        return this.organizationRepository.findOne({
            where: {
                id
            }
        })
    }

    /**
     *  通过ID 更新门店信息
     *  @param id 数据库中门店的id索引
     *  @param entity 门店的实体
     *  @returns Boolean 
     */
    async updateById(id: string, entity: DeepPartial<Organization>): Promise<boolean> {
        // 先获取原先的实例信息，save方法才会更新数据的createdAt & updatedAt
        const existEntity = await this.findById(id);
        if (!existEntity) {
            return false;
        }
        // 将两个对象进行合并
        Object.assign(existEntity, entity);
        const res = await this.organizationRepository.save(existEntity);
        if(res) {
            return true;
        }
        return false;
    }

    /**
     *  分页或者所有数据的接口
     *  @param start 起始页
     *  @param length 每页的数量
     *  @returns [Organization[], number]
     */
    async findStudents({start, length}: {start:number; length: number;}): Promise<[Organization[], number]> {
        return this.organizationRepository.findAndCount({
            take: length,
            skip: start,
            order: {
                createdAt: 'DESC'
            }
        })
    }

    /**
     *  通过ID 删除一个字段
     *  @param id 要删除的门店的ID
     *  @param userId 删除者的用户ID
     *  @returns Boolean
     */
    async deleteById(id: string, userId: string): Promise<boolean> {
        const res = await this.organizationRepository.update(id, {
            deletedBy: userId
        })
        if (res) {
            const result = await this.organizationRepository.softDelete(id);
            if(result.affected > 0) {
                return true;
            }
            return false;
        }
    }

}


