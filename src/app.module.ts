/*
 * @Date: 2023-03-31 09:03:20
 * @Author: Bruce
 * @Description: 
 */
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver } from "@nestjs/apollo";


import { UserModule } from "./modules/user/user.module";
import { CardModule } from "./modules/card/card.module";
import { OSSModule } from "./modules/oss/oss.module";
import { CourseModule } from "./modules/course/course.module";
import { AuthModule } from "./modules/auth/auth.module";
import { StudentModule } from "./modules/student/student.module";
import { OrganizationModule } from "./modules/organization/organization.module";
import { ProductModule } from "./modules/product/product.module";
import { DATA_BASE, HOST, PASS_WORD, PORT, TYPE, USER_NAME } from "./common/constants/mysql";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: TYPE,
      host: HOST,
      port: PORT,
      username: USER_NAME,
      password: PASS_WORD,
      database: DATA_BASE,
      entities: [`${__dirname}/../modules/**/*.entity{.ts,.js}`],
      logging: true,
      synchronize: true,
      autoLoadEntities: true
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: "./schema.gql",
    }),
    UserModule,
    OSSModule,
    AuthModule,
    StudentModule,
    OrganizationModule,
    CourseModule,
    CardModule,
    ProductModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}


