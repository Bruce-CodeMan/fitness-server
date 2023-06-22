import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
class OrderTimeType {
    @Field({ description: "开始时间" })
    startTime: string;

    @Field({ description: "结束时间" })
    endTime: string;

    @Field({ description: "序号" })
    key: number;
}

@ObjectType()
export class ReducibleTimeType {
    @Field({ description: "星期" })
    week: string;

    @Field(() => [OrderTimeType], { description: "可约json" })
    orderTime: OrderTimeType[];
}