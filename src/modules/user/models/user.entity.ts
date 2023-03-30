import { Entity, Column } from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity('user')
export class User {
    @Column({
        comment: '昵称',
        default: ''
    })
    @IsNotEmpty()
    name: string;

    @Column({
        comment: "描述信息",
        default: ''
    })
    desc: string;

    @Column({
        comment: "手机号",
        nullable: true
    })
    tel: string;

    @Column({
        comment: "密码",
        nullable: true
    })
    password: string;

    @Column({
        comment: "账户信息",
        nullable: true
    })
    account: string;
}

