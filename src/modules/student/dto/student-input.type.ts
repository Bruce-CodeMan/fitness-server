/*
 * @Date: 2023-04-14 11:17:21
 * @Author: Bruce
 * @Description: 
 */
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class StuentInput {
    @Field({
        description: '昵称'
    })
    name: string;

    @Field({
        description: '手机号'
    })
    tel: string;

    @Field({
        description: '头像'
    })
    avatar: string;
}