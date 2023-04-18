/*
 * @Date: 2023-04-18 08:56:27
 * @Author: Bruce
 * @Description: 
 */
import { OrgImageInput } from "@/modules/orgImage/dto/orgImage-input.type";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class OrganizationInput {
    @Field({ description: '名称' })
    name: string;

    @Field({ description: 'logo' })
    logo: string;

    @Field({ description: '手机号', nullable: true })
    tel: string;

    @Field({ description: 'tags', nullable: true })
    tags: string;

    @Field({ description: 'longitude', nullable: true })
    longitude: string;

    @Field({ description: 'latitude', nullable: true })
    latitude: string;

    @Field({ description: '营业执照' })
    businessLicense: string;

    @Field({ description: '描述' })
    description: string;

    @Field({ description: '法人身份证正面' })
    identityCardFrontImg: string;

    @Field({ description: '法人身份证反面' })
    identityCardBackImg: string;

    @Field(() => [OrgImageInput], { nullable: true, description: '机构门面照片' })
    orgFrontImg?: OrgImageInput[];
    
    @Field(() => [OrgImageInput], { nullable: true, description: '机构环境照片' })
    orgRoomImg?: OrgImageInput[];
    
    @Field(() => [OrgImageInput], { nullable: true, description: '机构环境照片' })
    orgOtherImg?: OrgImageInput[];
}