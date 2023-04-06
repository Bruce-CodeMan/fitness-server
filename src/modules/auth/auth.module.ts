/*
 * @Date: 2023-04-06 13:25:20
 * @Author: Bruce
 * @Description: 
 */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { User } from "../user/models/user.entity";
import { UserService } from "../user/user.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [AuthService, AuthResolver, UserService],
    exports: []
})

export class AuthModule{};