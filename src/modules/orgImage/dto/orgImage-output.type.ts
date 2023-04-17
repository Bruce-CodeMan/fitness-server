import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class OrgImageOutput {
    @Field({ nullable: true })
    id?: string;

    @Field()
    url: string;

    @Field({ nullable: true })
    remark?: string;
}