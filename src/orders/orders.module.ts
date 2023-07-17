import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Order} from 'src/orders/models/order.model';
import {OrdersController} from './orders.controller';
import {OrdersService} from './orders.service';
import {CartController} from "../cart/cart.controller";
import {CartService} from "../cart/cart.service";

@Module({
    imports: [SequelizeModule.forFeature([Order])],
    providers: [OrdersService, CartService],
    controllers: [OrdersController, CartController],
})
export class OrdersModule {
}

