/*
 * @Date: 2023-03-31 14:47:28
 * @Author: Bruce
 * @Description: 
 */
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UserInput{
    @Field()
    name: string;
    @Field()
    desc: string;
}