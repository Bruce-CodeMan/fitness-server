/*
 * @Date: 2023-04-14 13:25:19
 * @Author: Bruce
 * @Description: 
 */
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { StudentService } from "./student.service";
import { StudentInput } from "./dto/student-input.type";

@Resolver()
export class StudentResolver {
    constructor(private readonly studentService: StudentService) {}

    @Mutation(() => Boolean)
    async createStudent1(@Args('params') params: StudentInput): Promise<boolean>{
        return await this.studentService.create(params);
    }
}