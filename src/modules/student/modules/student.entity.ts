/*
 * @Date: 2023-04-14 09:46:58
 * @Author: Bruce
 * @Description: 
 */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity('student')
export class Student {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ comment: "昵称", default: "" })
    @IsNotEmpty()
    name: string

    @Column({ comment: "手机号", nullable: true })
    tel: string

    @Column({ comment: "头像", nullable: true })
    avatar: string

    @Column({ comment: "密码", })
    password: string

    @Column({ comment: "账号", })
    account: string
}