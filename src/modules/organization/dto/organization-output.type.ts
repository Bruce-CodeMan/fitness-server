/*
 * @Date: 2023-04-18 09:46:14
 * @Author: Bruce
 * @Description: 
 */
import { ObjectType } from "@nestjs/graphql";

import { createResult, createResults } from "@/common/dto/result.type";
import { OrganizationType } from "./organization.type";

@ObjectType()
export class OrganizationResult extends createResult(OrganizationType) {}

@ObjectType()
export class OrganizationResults extends createResults(OrganizationType) {}