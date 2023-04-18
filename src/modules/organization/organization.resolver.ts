/*
 * @Date: 2023-04-18 08:56:27
 * @Author: Bruce
 * @Description: 
 */
import { Resolver } from "@nestjs/graphql";
import { OrganizationService } from "./organization.service";

@Resolver()
export class OrganizationResolver {
    constructor(
        private readonly organizationService: OrganizationService,
    ){}
}