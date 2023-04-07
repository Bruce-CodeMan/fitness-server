/*
 * @Date: 2023-03-31 09:03:20
 * @Author: Bruce
 * @Description: 
 */
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from "./modules/user/user.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver } from "@nestjs/apollo";
import { OSSModule } from "./modules/oss/oss.module";
import { AuthModule } from "./modules/auth/auth.module";
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
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


