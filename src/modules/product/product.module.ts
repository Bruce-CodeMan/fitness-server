import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Product } from "./models/product.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    providers: [ ],
    exports: []
})

export class ProductModule {}