import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {CartService} from "./cart.service";
import {CartController} from "./cart.controller";
import {Sepet} from "./models/cart.model";

@Module({
    imports: [SequelizeModule.forFeature([Sepet])],
    providers: [CartService],
    controllers: [CartController],
})
export class CartModule {}
