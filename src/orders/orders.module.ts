import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Order} from 'src/orders/models/order.model';
import {OrdersController} from './orders.controller';
import {OrdersService} from './orders.service';

@Module({
    imports: [SequelizeModule.forFeature([Order])],
    providers: [OrdersService],
    controllers: [OrdersController],
    exports: [OrdersService]
})
export class OrdersModule {
}

