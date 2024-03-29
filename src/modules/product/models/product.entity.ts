import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { IsNotEmpty, Min } from "class-validator";


// Custom Imports
import { CommonEntity } from "@/common/entities/common.entity";
import { ProductStatus } from "@/common/constants/enum";
import { Organization } from "@/modules/organization/models/organization.entity";
import { Card } from "@/modules/card/models/card.entity";

/**
 * 商品
 */
@Entity("product")
export class Product extends CommonEntity {
  @Column({ comment: "名称" })
  @IsNotEmpty()
  name: string;

  @Column({ comment: "描述", nullable: true })
  desc: string;

  @Column({ comment: "分类", nullable: true })
  type: string;

  @Column({ comment: "商品状态: 上架 / 下架", default: ProductStatus.UN_LIST })
  @IsNotEmpty()
  status: string;

  @Column({ comment: "库存总数", default: 0 })
  stock: number;

  @Column({ comment: "当前库存", default: 0 })
  curStock: number;

  @Column({ comment: "卖出去多少", default: 0 })
  buyNumber: number;

  @Column({ comment: "每人限购数量", default: -1 })
  limitBuyNumber: number;

  @Column({ comment: "封面图" })
  coverUrl: string;

  @Column({ comment: "头部banner图" })
  bannerUrl: string;

  @Column({ comment: "原价", type: "float" })
  @IsNotEmpty()
  @Min(0.01)
  originalPrice: number;

  @Column({ comment: "优惠价", type: "float" })
  @IsNotEmpty()
  @Min(0.01)
  preferentialPrice: number;

  @ManyToOne(() => Organization, (org) => org.products, {
    cascade: true
  })
  org: Organization;

  @ManyToMany(() => Card, { cascade: true })
  @JoinTable({ name: "product_card" })
  cards: Card[];
}