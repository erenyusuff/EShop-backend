import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Cart } from 'src/cart/models/cart.model';
import { CartService } from 'src/cart/cart.service';
import {CreateCartDto} from "./dto/create-cart.dto";

@Controller('Cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post()
    create(@Body() createCartDto: CreateCartDto): Promise<Cart> {
        return this.cartService.create(createCartDto);
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
