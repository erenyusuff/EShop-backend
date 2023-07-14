import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {CartService} from "./cart.service";
import {CartController} from "./cart.controller";
import {Cart} from "./models/cart.model";
import {CartProducts} from "./models/cart-products.model";

@Module({
    imports: [SequelizeModule.forFeature([Cart,CartProducts])],
    providers: [CartService],
    controllers: [CartController],
})
export class CartModule {}
