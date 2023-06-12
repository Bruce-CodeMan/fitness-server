import { Query, Resolver, Args, Mutation } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

// Custom Imports
import { CourseType } from "./dto/course.type";
import { GqlAuthGuard } from "@/common/guards/auth.guards";
import { CourseService } from "./course.service";
import { CourseResult, CourseResults } from "./dto/result-course.output";
import { SUCCESS, COURSE_NOT_EXIST, COURSE_CREATE_FAIL, COURSE_UPDATE_FAIL, COURSE_DEL_FAIL } from "@/common/constants/code";
import { ParticalCourseInput } from "./dto/course.input";
import { CurUserId } from "@/common/decorators/current-user.decorator";
import { CurOrgId } from "@/common/decorators/current-org.decorator";
import { Result } from "@/common/dto/result.type";
import { PageInput } from "@/common/dto/page-input.type";
import { FindOptionsWhere, Like } from "typeorm";
import { Course } from "./models/course.entity";

@Resolver(() => CourseType)
@UseGuards(GqlAuthGuard)
export class CourseResolver {
    constructor(private readonly courseService: CourseService){}

    /**
     * 获取课程信息
     * @param id 传递课程的id
     * @returns 
     */
    @Query(() => CourseResult)
    async getCourseInfo(@Args("id") id: string): Promise<CourseResult> {
        const result = await this.courseService.findById(id);
        if(result) {
            return {
                code:SUCCESS,
                data: result,
                message: "获取成功"
            }
        }
        return {
            code: COURSE_NOT_EXIST,
            message: "课程信息不存在"
        }
    }

    /**
     * 提交课程信息
     * @param params 
     * @param userId 用户的Id
     * @param orgId 组织的Id
     * @param id 课程id,如果没有传递id就是增加，传递课程id就是修改课程信息
     * @returns 
     */
    @Mutation(() => CourseResult)
    async commitCourseInfo(
        @Args("params") params: ParticalCourseInput,
        @CurUserId() userId: string,
        @CurOrgId() orgId: string,
        @Args('id', { nullable: true }) id: string
    ): Promise<Result> {
        if(!id) {
            const res = await this.courseService.create({
                ...params,
                createdBy: userId,
                org: {
                    id: orgId
                },
            });
            if(res) {
                return {
                    code: SUCCESS,
                    message: "创建成功"
                }
            }
            return {
                code: COURSE_CREATE_FAIL,
                message: "创建失败"
            }
        }
        const course = await this.courseService.findById(id);
        if(course) {
            const res = await this.courseService.updateById(course.id, {
                ...params,
                updatedBy: userId
            })
            if(res) {
                return {
                    code: SUCCESS,
                    message: "更新成功"
                }
            }
            return {
                code: COURSE_UPDATE_FAIL,
                message: "更新失败"
            }
        }
        return {
            code: COURSE_NOT_EXIST,
            message: "课程不存在"
        }
    }

    /**
     * 
     * @param page 
     * @param userId 
     * @param orgId 
     * @param name 
     * @returns 
     */
    @Query(() => CourseResults)
    async getCourses(
        @Args('page') page: PageInput,
        @CurUserId() userId: string,
        @CurOrgId() orgId: string,
        @Args('name', { nullable: true }) name?: string 
    ): Promise<CourseResults> {
        const { pageNum, pageSize } = page;
        const where: FindOptionsWhere<Course> = {
            createdBy: userId,
            org: {
                id: orgId
            }
        }
        if (name) {
            where.name = Like(`%${name}%`);
        }
        const [results, total] = await this.courseService.findCourses({
            start: pageNum === 1 ? 0 : (pageNum - 1) * pageSize + 1,
            length: pageSize,
            where
        })
        return {
            code: SUCCESS,
            data: results,
            page: {
                pageNum,
                pageSize,
                total
            },
            message: "获取成功"
        }
    }

    /**
     * 删除课程
     * @param id 课程的id
     * @param userId 用户的id
     * @returns 
     */
    @Mutation(() => Result)
    async deleteCourse(
        @Args('id') id: string,
        @CurUserId() userId: string
    ): Promise<Result> {
        const result = await this.courseService.findById(id);
        if(result) {
            const delRes = await this.courseService.deleteById(id, userId);
            if(delRes) {
                return {
                    code: SUCCESS,
                    message: "删除成功"
                }
            }
            return {
                code: COURSE_DEL_FAIL,
                message: "删除失败"
            }
        }
        return {
            code: COURSE_NOT_EXIST,
            message: "门店信息不存在"
        }
    }
}