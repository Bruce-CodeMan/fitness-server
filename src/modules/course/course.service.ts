import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";

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

    


}