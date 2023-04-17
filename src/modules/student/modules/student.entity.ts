/*
 * @Date: 2023-04-14 09:46:58
 * @Author: Bruce
 * @Description: 
 */
import { Column, Entity } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { CommonEntity } from "@/common/entities/common.entity";

@Entity('student')
export class Student extends CommonEntity{

    @Column({ comment: "昵称", default: "" })
    @IsNotEmpty()
    name: string

    @Column({ comment: "手机号", nullable: true })
    tel: string

    @Column({ comment: "头像", nullable: true })
    avatar: string

    @Column({ comment: "密码", nullable: true})
    password: string

    @Column({ comment: "账号", nullable:true})
    account: string
}