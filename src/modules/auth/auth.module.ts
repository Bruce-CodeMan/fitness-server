/*
 * @Date: 2023-04-06 13:25:20
 * @Author: Bruce
 * @Description: 
 */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { User } from "../user/models/user.entity";
import { UserService } from "../user/user.service";
import { JWT_EXPIRATION, JWT_SECRET } from "@/common/constants/jwt";

@Module({
    imports: [
        JwtModule.register({
            secret: JWT_SECRET,
            signOptions: {
                expiresIn: JWT_EXPIRATION
            }
        }),
        TypeOrmModule.forFeature([User])],
    providers: [AuthService, AuthResolver, UserService],
    exports: []
})

export class AuthModule{};