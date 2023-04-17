/*
 * @Date: 2023-04-17 14:59:28
 * @Author: Bruce
 * @Description: 
 */
import { Field, InputType } from "@nestjs/graphql";
import { IsInt, Min } from "class-validator";

@InputType()
export class PageInput {
    @Field()
    @IsInt()
    @Min(0)
    pageNum: number;

    @Field()
    @IsInt()
    @Min(0)
    pageSize: number;
}