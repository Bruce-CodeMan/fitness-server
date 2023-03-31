/*
 * @Date: 2023-03-31 09:03:20
 * @Author: Bruce
 * @Description: 
 */
import { Module, ConsoleLogger } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { User } from "./models/user.entity";
import { UserService } from "./user.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [ConsoleLogger, UserService],
    exports: [UserService],
})

export class UserModule {}

