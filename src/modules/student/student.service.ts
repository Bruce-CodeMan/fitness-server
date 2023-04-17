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

    // 通过账户信息查询
    async findByAccount(account: string): Promise<Student> {
        return this.studentRepository.findOne({
            where: {
                account,
            }
        })
    }

    // 新增学生信息
    async create(entity: DeepPartial<Student>): Promise<boolean> {
        const res = await this.studentRepository.save(
            this.studentRepository.create(entity)
        );
        if(res) {
            return true;
        }
        return false;
    }

    // 通过ID查询学员信息
    async findById(id: string): Promise<Student> {
        return this.studentRepository.findOne({
            where: {
                id,
            }
        })
    }

    // 通过ID更新学员信息
    async updateById(id: string, entity: DeepPartial<Student>): Promise<boolean> {
        const res = await this.studentRepository.update(id, entity);
        if (res.affected > 0) {
            return true;
        }
        return false;
    }

    // 分页查询学员信息
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