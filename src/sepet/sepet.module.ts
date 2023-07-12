import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {SepetService} from "./sepet.service";
import {SepetController} from "./sepet.controller";
import {Sepet} from "./models/sepet.model";

@Module({
    imports: [SequelizeModule.forFeature([Sepet])],
    providers: [SepetService],
    controllers: [SepetController],
})
export class SepetModule {}
