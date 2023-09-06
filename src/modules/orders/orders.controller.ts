import {Body, Controller, Delete, Get, Param, Post, Request} from '@nestjs/common';
import {CreateOrderDto} from './dto/create-order.dto';
import {Order} from './models/order.model';
import {OrdersService} from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {
    }

    @Post()
    create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
        return this.ordersService.create(createOrderDto);
    }

    // @Get()
    // findAll(): Promise<Order[]> {
    //     return this.ordersService.findAll();
    // }
    //
    // @Get(':id')
    // findOne(@Param('id') id: string): Promise<Order> {
    //     return this.ordersService.findOne(id);
    // }
    @Get('myOrders')
    findAllOrders(@Request() request) {
        return this.ordersService.findCurrentUsersOrdersByToken(request);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.ordersService.remove(id);
    }
}
