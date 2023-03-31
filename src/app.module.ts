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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'fitness',
      entities: [`${__dirname}/../modules/**/*.entity{.ts,.js}`],
      logging: true,
      synchronize: true,
      autoLoadEntities: true
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


