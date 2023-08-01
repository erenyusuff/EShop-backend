import {Controller, Get, Param} from '@nestjs/common';
import {StatisticsService} from "./statistics.service";
import {Cart} from "../cart/models/cart.model";
import {Public} from "../../core/decorators/public.decorator";

@Controller('statistics')
export class StatisticsController {
    constructor(
        private readonly statisticsService: StatisticsService,
    ) {
    }

    @Public()
    @Get('products')
    findAll(): Promise<Cart> {
        return this.statisticsService.findAll();
    }

    @Public()
    @Get('topSpenders')
    findByMBPU(): Promise<any> {
        return this.statisticsService.findUsersTotal()
    }

    @Public()
    @Get(':id/soldTogether')
    soldTogether(@Param('id') id: number): Promise<any> {
        return this.statisticsService.soldTogether(id);
    }
}