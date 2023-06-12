import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Custom Imports
import { Course } from "./models/course.entity";
import { CourseService } from "./course.service";
import { CourseResolver } from "./course.resolver";

@Module({
    imports: [TypeOrmModule.forFeature([Course])],
    providers: [ CourseService, CourseResolver ],
    exports: [ CourseService ]
})

export class CourseModule{}