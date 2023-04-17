/*
 * @Date: 2023-04-14 13:25:19
 * @Author: Bruce
 * @Description: 
 */
import { Args, Resolver, Query } from "@nestjs/graphql";
import { StudentService } from "./student.service";
import { StudentResult } from "./dto/student-result.output";
import { STUDENT_NOT_EXIST, SUCCESS } from "@/common/constants/code";

@Resolver()
export class StudentResolver {
    constructor(private readonly studentService: StudentService) {}

    @Query(() => StudentResult)
    async getStudentInfo(@Args('id') id: string): Promise<StudentResult> {
        const result = await this.studentService.findById(id);
        if(result) {
            return {
                code: SUCCESS,
                data: result,
                message: "获取成功"
            }
        }
        return {
            code: STUDENT_NOT_EXIST,
            message: "用户不存在"
        }
    }
}