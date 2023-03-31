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
    @Field()
    name: string;
    @Field()
    desc: string;
    @Field({ description: "账户信息" })
    account: string;
}