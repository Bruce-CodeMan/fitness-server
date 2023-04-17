/*
 * @Date: 2023-04-14 10:35:20
 * @Author: Bruce
 * @Description: 
 */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from "./modules/student.entity";
import { Repository, DeepPartial } from "typeorm";

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>
    ){}

    /**
     * 通过账户信息查询
     * @param account 传入的账户信息
     * @returns Student的实体类
     */
    async findByAccount(account: string): Promise<Student> {
        return this.studentRepository.findOne({
            where: {
                account,
            }
        })
    }

    /**
     * 创建一条Student信息
     * @param entity 传入Student的实体类
     * @returns Boolean
     */
    async create(entity: DeepPartial<Student>): Promise<boolean> {
        const res = await this.studentRepository.save(
            this.studentRepository.create(entity)
        );
        if(res) {
            return true;
        }
        return false;
    }

    /**
     * 通过ID查询学员信息
     * @param id 传入的Student ID
     * @returns Student的实体类
     */
    async findById(id: string): Promise<Student> {
        return this.studentRepository.findOne({
            where: {
                id,
            }
        })
    }

    /**
     * 通过ID更新学员信息
     * @param id 传入一个Student的ID
     * @param entity 传入Student 实体类
     * @returns Boolean
     */
    async updateById(id: string, entity: DeepPartial<Student>): Promise<boolean> {
        const res = await this.studentRepository.update(id, entity);
        if (res.affected > 0) {
            return true;
        }
        return false;
    }

    /**
     * 分页查询学员信息
     * @param start:起始页
     * @param length:每页的数量
     * @returns 
     */
    async findStudents({start, length}: {start:number;length: number;}): Promise<[Student[], number]> {
        return this.studentRepository.findAndCount({
            take: length,
            skip: start,
            order: {
                createdAt: 'DESC',
            }
        })
    }
}