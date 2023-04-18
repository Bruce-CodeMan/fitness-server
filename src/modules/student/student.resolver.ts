/*
 * @Date: 2023-04-14 13:25:19
 * @Author: Bruce
 * @Description: 
 */
import { Args, Resolver, Query, Mutation } from "@nestjs/graphql";
import { StudentService } from "./student.service";
import { StudentResult, StudentResults } from "./dto/student-output.type";
import { STUDENT_NOT_EXIST, SUCCESS } from "@/common/constants/code";
import { PageInput } from "../../common/dto/page-input.type";
import { StudentInput } from "./dto/student-input.type";
import { Result } from "@/common/dto/result.type";
import { CurUserId } from "@/common/decorators/current-user.decorator";

@Resolver()
export class StudentResolver {
    constructor(private readonly studentService: StudentService) {}

    // 创建学员
    @Mutation(() => Boolean)
    async createStudent(@Args('params') params: StudentInput): Promise<boolean> {
        return await this.studentService.create(params);
    }

    // 通过ID查找学员信息
    @Query(() => StudentResult)
    async getStudentInfo(@CurUserId('id') id: string): Promise<StudentResult> {
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

    // 更新学员信息, CurUseId是装饰器获取用户的id
    @Mutation(() => StudentResult)
    async commitStudentInfo(@Args('params') params: StudentInput, @CurUserId('id') id: string): Promise<Result> {
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
            start: pageNum,
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