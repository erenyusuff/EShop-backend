import {Body, Controller, Delete, Get, Param, Patch, Post, Request} from '@nestjs/common';
import {CreateOrderDto} from './dto/create-order.dto';
import {Order} from './models/order.model';
import {OrdersService} from './orders.service';
import {UpdateOrderDto} from "./dto/update-order.dto";

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

    // @Get()
    // findAll(): Promise<Order[]> {
    //     return this.ordersService.findAll();
    // }
    //
    // @Get(':id')
    // findOne(@Param('id') id: string): Promise<Order> {
    //     return this.ordersService.findOne(id);
    // }
    @Get('all')
    findAllOrders() {
        return this.ordersService.findAll();
    }

    @Get('myOrders')
    findMyOrders(@Request() request) {
        return this.ordersService.findCurrentUsersOrdersByToken(request);
    }
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.ordersService.remove(id);
    }
}
