import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import {CartProducts} from "../cart/models/cart-products.model";

@Module({
  providers: [StatisticsService,{provide: 'CartProductRepo', useValue:CartProducts}],
  controllers: [StatisticsController]
})
export class StatisticsModule {}
