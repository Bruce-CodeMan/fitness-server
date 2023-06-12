import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";

// Custom Imports
import { Course } from "./models/course.entity";


@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>
    ){}

    /**
     * Create Course By Course Entity
     * @param entity 
     * @returns Boolean
     */
    async create(entity: DeepPartial<Course>): Promise<boolean> {
        const res = await this.courseRepository.save(
            this.courseRepository.create(entity)
        );
        if(res) {
            return true;
        }
        return false;
    }

    /**
     * Find Course By Course Id
     * @param id 
     * @returns Course Entity
     */
    async findById(id: string): Promise<Course> {
        return this.courseRepository.findOne({
            where: {
                id
            }
        })
    }

    /**
     * Update the Course By Course Id
     * @param id 
     * @param entity 
     * @returns 
     */
    async updateById(id: string, entity: DeepPartial<Course>): Promise<boolean> {
        const existEntity = await this.findById(id);
        if(!existEntity) {
            return false;
        }
        Object.assign(existEntity, entity);
        const res = await this.courseRepository.save(existEntity);
        if(res) {
            return true;
        }else{
            return false;
        }
    }

    /**
     * Find the Course By Page
     * @param param0 
     * @returns 
     */
    async findCourses({
        start,
        length,
        where
    }: {
        start: number;
        length: number;
        where: FindOptionsWhere<Course>
    }): Promise<[Course[], number]> {
        return this.courseRepository.findAndCount({
            take: length,
            skip: start,
            where,
            order: {
                createdAt: 'DESC'
            }
        })
    }

    /**
     * Use SoftDelete to delete the Course
     * @param id 
     * @param userId 
     * @returns 
     */
    async deleteById(id: string, userId: string): Promise<boolean> {
        const res1 = await this.courseRepository.update(id, {
            deletedBy: userId
        })
        if(res1) {
            const res = await this.courseRepository.softDelete(id);
            if(res.affected > 0){
                return true;
            }
        }
        return false
    }


}