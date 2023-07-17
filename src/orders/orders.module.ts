import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from 'src/orders/models/order.model';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CartController } from '../cart/cart.controller';

@Module({
  imports: [SequelizeModule.forFeature([Order])],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService]
})
export class OrdersModule {
}

