import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './models/cart.model';
import { CartProducts } from './models/cart-products.model';
import { OrdersModule } from '../orders/orders.module';
import {Product} from "../products/models/product.model";

@Module({
  imports: [
    SequelizeModule.forFeature([Cart, CartProducts]),
    OrdersModule
  ],
  providers: [CartService,{provide: 'ProductRepo', useValue:Product},{provide: 'CartProductRepo', useValue:CartProducts}],
  controllers: [CartController]
})
export class CartModule {}


