/*
 * @Date: 2023-04-14 10:00:29
 * @Author: Bruce
 * @Description: 
 */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "./modules/student.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Student])],
    providers: [],
    exports: [],
})

export class StudentModule {}