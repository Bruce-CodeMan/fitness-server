/*
 * @Date: 2023-04-17 09:37:22
 * @Author: Bruce
 * @Description: 
 */
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CommonType {
    @Field()
    id: string;

    @Field()
    createdAt: Date;

    @Field({ nullable: true })
    createdBy: string;

    @Field()
    updatedAt: Date;

    @Field()
    updatedBy: string;

    @Field()
    deletedAt: Date;

    @Field()
    deletedBy: string;
}