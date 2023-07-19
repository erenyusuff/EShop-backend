import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {Cart} from 'src/cart/models/cart.model';
import {CartService} from 'src/cart/cart.service';
import {CreateCartDto} from "./dto/create-cart.dto";
import {Order} from "../orders/models/order.model";


@Controller('Cart')
export class CartController {
    constructor(
        private readonly cartService: CartService,
    ) {
    }

    @Post()
    create(@Body() createCartDto: CreateCartDto): Promise<Cart> {
        return this.cartService.create(createCartDto);
    }

    @Put(':id/buy')
    buy(@Param('id') id: number): Promise<Order> {
        return this.cartService.buy(id);
    }

    @Get()
    findAll(): Promise<Cart[]> {
        return this.cartService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Cart> {
        return this.cartService.findOne(id);
    }


    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.cartService.remove(id);
    }
}
