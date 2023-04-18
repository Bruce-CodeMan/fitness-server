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

    
}