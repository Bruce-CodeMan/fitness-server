/*
 * @Date: 2023-04-18 08:56:27
 * @Author: Bruce
 * @Description: 
 */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrgImage } from "../orgImage/models/orgImage.entity";
import { OrgImageService } from "../orgImage/orgImage.service";
import { Organization } from "./models/organization.entity";
import { OrganizationResolver } from "./organization.resolver";
import { OrganizationService } from "./organization.service";

@Module({
    imports: [TypeOrmModule.forFeature([Organization, OrgImage])],
    providers: [OrganizationService, OrganizationResolver, OrgImageService],
    exports: [OrgImageService]
})

export class OrganizationModule {}