/*
 * @Date: 2023-04-18 09:40:36
 * @Author: Bruce
 * @Description: 
 */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrgImage } from "./models/orgImage.entity";

@Injectable()
export class OrgImageService {
    constructor(
        @InjectRepository(OrgImage)
        private readonly orgImageRepository: Repository<OrgImage>
    ){}
    
    /**
     * 通过传入的id删除orgImage的信息
     * @param id organization的ID
     * @returns 
     */
    async deleteByOrg(id): Promise<boolean> {
        // 自定义查询
        const images = await this.orgImageRepository.createQueryBuilder('orgImage')
                                     .where(`orgImage.orgIdForFrontId = '${id}'`)
                                     .orWhere(`orgImage.orgIdForRoomId = '${id}'`)
                                     .orWhere(`orgImage.orgIdForOtherId = '${id}'`)
                                     .getMany();
        if(images.length === 0) {
            return true
        }
        const delResult = await this.orgImageRepository.delete(
            images.map((item) => item.id)
        );
        if(delResult.affected > 0) {
            return true;
        }
        return false;
    }
}