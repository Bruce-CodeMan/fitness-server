/*
 * @Date: 2023-03-31 15:13:45
 * @Author: Bruce
 * @Description: 
 */
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserType {
    @Field()
    id?: string;

    @Field({ description: "昵称" })
    name: string;
    
    @Field({ description: "描述" })
    desc: string;
    
    @Field({ description: "头像", nullable: true })
    avatar: string;

    @Field({ description: "手机号" })
    tel: string;
}