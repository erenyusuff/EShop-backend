import {Body, Controller, Delete, Get, Param, Patch, Post, Query, Request} from '@nestjs/common';
import {CreateOrderDto} from './dto/create-order.dto';
import {Order} from './models/order.model';
import {OrdersService} from './orders.service';
import {UpdateOrderDto} from "./dto/update-order.dto";
import {PaginateQuery} from "../../core/database/paginate.decorator";
import {PaginateQueryInterface} from "../../core/database/paginate.intercase";
import {Product} from "../products/models/product.model";

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {
    }

    @Post()
    create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
        return this.ordersService.create(createOrderDto);
    }

    @Patch('update')
    update(@Body() updateOrderDto: UpdateOrderDto) {
        return this.ordersService.update(updateOrderDto)
    }

    @Get('all')
    findAll2(@PaginateQuery('all') paginateQuery?: PaginateQueryInterface,): Promise<any> {
        return this.ordersService.findAll2(paginateQuery);
    }

    @Get('state')
    findAllOfThem(@PaginateQuery('all') paginateQuery?: PaginateQueryInterface,): Promise<any> {
        return this.ordersService.findAll3(paginateQuery);
    }

    // @Get(':id')
    // findOne(@Param('id') id: string): Promise<Order> {
    //     return this.ordersService.findOne(id);
    // }

    @Get('myOrders')
    findMyOrders(@Request() req): any {
        return this.ordersService.findCurrentUsersOrdersByToken(req);
    }
    @Get('page')
    findAll(@Query('page')page: string, @PaginateQuery('all') paginateQuery?: PaginateQueryInterface,): Promise<any> {
        console.log(page)
        return this.ordersService.findAll(paginateQuery);
    }


    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.ordersService.remove(id);
    }
}
