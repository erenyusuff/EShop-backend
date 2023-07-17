import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './models/cart.model';
import { CartProducts } from './models/cart-products.model';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Cart, CartProducts]),
    OrdersModule
  ],
  providers: [CartService],
  controllers: [CartController]
})
export class CartModule {}


