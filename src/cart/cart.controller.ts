import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { Cart } from 'src/cart/models/cart.model';
import { CartService } from 'src/cart/cart.service';
import {CreateCartDto} from "./dto/create-cart.dto";
import {Order} from "../orders/models/order.model";
import {CreateOrderDto} from "../orders/dto/create-order.dto";
import {OrdersService} from "../orders/orders.service";

@Controller('Cart')
export class CartController {
    constructor(
        private readonly cartService: CartService,
        private readonly ordersService:OrdersService
    ) {}

    @Post()
    create(@Body() createCartDto: CreateCartDto): Promise<Cart> {
        return this.cartService.create(createCartDto);
    }
    @Put(':id/buy')
    buy(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
        return this.ordersService.create(createOrderDto);
    }

    @Get()
    findAll(): Promise<Cart[]> {
        return this.cartService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Cart> {
        return this.cartService.findOne(id);
    }


    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.cartService.remove(id);
    }
}
