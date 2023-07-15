/*
 * @Date: 2023-04-18 08:56:27
 * @Author: Bruce
 * @Description: 
 */
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany } from "typeorm";

import { CommonEntity } from "@/common/entities/common.entity";
import { Course } from "@/modules/course/models/course.entity";
import { OrgImage } from "@/modules/orgImage/models/orgImage.entity";
import { Card } from "@/modules/card/models/card.entity";
import { Product } from "@/modules/product/models/product.entity";

@Entity("organization")
export class Organization extends CommonEntity {
    @Column({ comment: '营业执照' })
    @IsNotEmpty()
    businessLicense: string;

    @Column({ comment: '法人身份证正面' })
    @IsNotEmpty()
    identityCardFrontImg: string;

    @Column({ comment: '法人身份证反面' })
    @IsNotEmpty()
    identityCardBackImg: string;

    @Column({ comment: '标签 以,分隔', type: 'text', nullable: true })
    tags: string;

    @Column({ comment: '简介', type: 'text', nullable: true })
    description: string;

    @Column({ comment: '机构名称', nullable: true, default: '' })
    name: string;

    @Column({ comment: 'logo', nullable: true })
    logo: string;

    @Column({ comment: '地址', nullable: true })
    address: string;

    @Column({ comment: '经度', nullable: true })
    longitude: string;

    @Column({ comment: '纬度', nullable: true})
    latitude: string;

    @Column({ comment: '电话', nullable: true })
    tel: string;

    @OneToMany(() => OrgImage, (orgImage) => orgImage.orgIdForFront, { cascade: true })
    orgFrontImg?: OrgImage[];

    @OneToMany(() => OrgImage, (orgImage) => orgImage.orgIdForRoom, { cascade: true })
    orgRoomImg?: OrgImage[];

    @OneToMany(() => OrgImage, (orgImage) => orgImage.orgIdForOther, { cascade: true })
    orgOtherImg?: OrgImage[];

    @OneToMany(() => Course, (course) => course.org)
    courses: Course[];

    @OneToMany(() => Card, (card) => card.org)
    cards: Card[];

    @OneToMany(() => Product,(product) => product.org)
    products: Product[];
}


