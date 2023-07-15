import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne } from "typeorm";

// Custom Imports
import { Course } from "@/modules/course/models/course.entity";
import { Organization } from "@/modules/organization/models/organization.entity";
import { CommonEntity } from "@/common/entities/common.entity";


export enum CardType {
    TIME = "time",
    DURATION = "duration"
}

/**
 * 消费卡
 */
@Entity('card')
export class Card extends CommonEntity {
    @Column({ comment: "名称", default: '' })
    name: string;

    @Column({ comment: "消费卡的类型", default: CardType.TIME })
    @IsNotEmpty()
    type: string;

    @Column({ comment: "上课次数", default: 0 })
    time: number;

    @Column({ comment: "有效期", default: 0 })
    validate: number;

    @ManyToOne(() => Course, { cascade: true })
    course: Course;

    @ManyToOne(() => Organization, { cascade: true })
    org: Organization;
}