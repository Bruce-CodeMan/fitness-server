/*
 * @Date: 2023-04-07 09:13:09
 * @Author: Bruce
 * @Description: 
 */
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Page {
    @Field(() => Int)
    total: number;

    @Field(()=>Int)
    pageNum?: number;

    @Field(()=>Int)
    pageSize?: number;
}