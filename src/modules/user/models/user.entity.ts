/*
 * @Date: 2023-03-31 09:03:20
 * @Author: Bruce
 * @Description: 
 */
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ comment: '昵称', default: '' })
    @IsNotEmpty()
    name: string;

    @Column({ comment: "描述信息", default: '' })
    desc: string;

    @Column({ comment: "头像", default: '' })
    avatar: string;

    @Column({ comment: "手机号", nullable: true })
    tel: string;

    @Column({ comment: "密码", nullable: true })
    password: string;

    @Column({ comment: "账户信息", nullable: true })
    account: string;

    @Column({ comment: "验证码", nullable: true })
    code: string;

    @Column({ comment: "验证码生成时间", nullable: true })
    codeCreatetime: Date;
}

