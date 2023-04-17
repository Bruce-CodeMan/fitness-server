/*
 * @Date: 2023-04-14 13:25:19
 * @Author: Bruce
 * @Description: 
 */
import { Args, Resolver, Query, Mutation } from "@nestjs/graphql";
import { StudentService } from "./student.service";
import { StudentResult, StudentResults } from "./dto/student-result.output";
import { STUDENT_NOT_EXIST, SUCCESS } from "@/common/constants/code";
import { PageInput } from "../../common/dto/page-input";
import { StudentInput } from "./dto/student-input.type";
import { Result } from "@/common/dto/result.type";

@Resolver()
export class StudentResolver {
    constructor(private readonly studentService: StudentService) {}

    // 通过ID查找学员信息
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

    // 更新学员信息
    @Mutation(() => StudentResult)
    async commitStudentInfo(@Args('params') params: StudentInput, @Args('id') id: string): Promise<Result> {
        const student = await this.studentService.findById(id);
        if(student) {
            const res = await this.studentService.updateById(student.id, params);
            if(res) {
                return {
                    code: SUCCESS,
                    message: "更新成功"
                }
            }
        }
        return {
            code: STUDENT_NOT_EXIST,
            message: "用户不存在"
        }
    }

    // 通过page的查询一组学员信息
    @Query(() => StudentResults)
    async getStudents(@Args('page') page: PageInput): Promise<StudentResults> {
        const { pageNum, pageSize } = page;
        const [ results, total ] = await this.studentService.findStudents({
            start: pageNum === 1 ? 0 : (pageNum - 1) * pageSize + 1,
            length: pageSize
        });
        return {
            code: SUCCESS,
            data: results,
            page: {
                pageNum,
                pageSize,
                total,
            },
            message: '获取成功'
        }
    }
}