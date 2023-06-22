import { Field, InputType } from "@nestjs/graphql";


@InputType()
class OrderTimeInput {
    @Field({ description: "开始时间" })
    startTime: string;

    @Field({ description: "结束时间" })
    endTime: string;

    @Field({ description: "序号" })
    key: number;
}

@InputType()
export class ReducibleTimeInput {
    @Field({ description: "星期" })
    week: string;

    @Field(() => [OrderTimeInput], { description: "可约json" })
    orderTime: OrderTimeInput[];
}