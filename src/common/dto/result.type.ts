/*
 * @Date: 2023-04-07 09:13:09
 * @Author: Bruce
 * @Description: 
 */
import { Page } from './page.type';
import { ClassType } from 'type-graphql'; 
import { Field, Int, ObjectType } from "@nestjs/graphql";

interface IResult<T> {
    code: number;
    message: string;
    data?: T;
}

interface IResults<T> {
    code: number;
    message: string;
    data?: T[];
    page?: Page;
}

export function createResult<T>(
    ItemType: ClassType<T>
): ClassType<IResult<T>> {

    @ObjectType()
    class Result {
      @Field(() => Int)
      code: number;

      @Field(() => String)
      message: string;

      @Field(() => ItemType, { nullable: true })
      data?: T;
    }
    return Result;
  }

export function createResults<T>(
    ItemTypes:ClassType<T>
): ClassType<IResults<T>> {

    @ObjectType()
    class Results {
        @Field(()=>Int)
        code: number;

        @Field(()=>String)
        message: string;

        @Field(()=>[ItemTypes], {nullable:true})
        data?: T[];

        @Field(()=>Page,{nullable:true})
        page?: Page;
    }
    return Results;
}

@ObjectType()
export class Result {
    @Field(() => Int)
    code: number;

    @Field(() => String)
    message: string;

    @Field(() => String, { nullable: true })
    data?: string;
}

