import { Query, Resolver } from "@nestjs/graphql";

import { ProductType } from "./dto/product.type";
import { ProductService } from "./product.service";

@Resolver(() => ProductType)
export class ProductResolver {
    constructor(private readonly productService: ProductService){}

}