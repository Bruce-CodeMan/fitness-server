import { Organization } from "@/modules/organization/models/organization.entity";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

/**
 *  资源机构
 */

@Entity('org_image')
export class OrgImage {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', comment: '地址' })
    @IsNotEmpty()
    url: string;

    // 备注信息
    @Column({ comment: 'remark', nullable: true })
    remark: string;

    @ManyToOne(() => Organization, (organiztion)=> organiztion.orgFrontImg)
    orgIdForFront: Organization
}

