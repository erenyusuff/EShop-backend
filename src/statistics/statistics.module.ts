import {Module} from '@nestjs/common';
import {StatisticsService} from './statistics.service';
import {StatisticsController} from './statistics.controller';
import {CartModule} from "../cart/cart.module";
import {OrdersModule} from "../orders/orders.module";

@Module({
    imports: [CartModule],
    providers: [StatisticsService],
    controllers: [StatisticsController]
})
export class StatisticsModule {
}
