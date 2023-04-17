/*
 * @Date: 2023-04-17 09:36:30
 * @Author: Bruce
 * @Description: 
 */
import { CommonType } from "@/common/dto/common.type";
import { Field, ObjectType } from "@nestjs/graphql";

/*
 * 学员
*/

@ObjectType()
export class StudentType extends CommonType {
    @Field({ description: "昵称", nullable: true })
    name: string;

    @Field({ description: "手机号", nullable: true })
    tel: string;

    @Field({ description: "头像", nullable: true })
    avatar: string;

    @Field({ description: "账号", nullable: true })
    account: string;
}