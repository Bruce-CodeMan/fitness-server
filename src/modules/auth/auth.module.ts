/*
 * @Date: 2023-04-06 13:25:20
 * @Author: Bruce
 * @Description: 
 */
import { Module, ConsoleLogger } from "@nestjs/common";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";

@Module({
    imports: [],
    providers: [AuthService, AuthResolver],
    exports: []
})

export class AuthModule{};