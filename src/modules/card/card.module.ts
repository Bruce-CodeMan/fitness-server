import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Custom Imports
import { Card } from "./models/card.entity";
import { CardService } from "./card.service";
import { CardResolver } from "./card.resolver";

@Module({
    imports: [TypeOrmModule.forFeature([Card])],
    providers: [ CardService, CardResolver ],
    exports: [ CardService ]
})

export class CardModule{}