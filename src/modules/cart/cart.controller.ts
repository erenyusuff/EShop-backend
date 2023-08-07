import {Body, Controller, Delete, Get, Param, Post, Put, Request} from '@nestjs/common';
import {Cart} from 'src/modules/cart/models/cart.model';
import {CartService} from 'src/modules/cart/cart.service';
import {CreateCartDto} from "./dto/create-cart.dto";
import {Order} from "../orders/models/order.model";
import {UpdateCartDto} from "./dto/update-cart.dto";
import {Public} from "../../core/decorators/public.decorator";

@Controller('Cart')
export class CartController {
    constructor(
        private readonly cartService: CartService,
    ) {
    }

    @Post()
    create(@Body() createCartDto: CreateCartDto, @Request() request): Promise<Cart> {
        return this.cartService.create(createCartDto, request);

    }

    @Put('current/addToCart')
    addProduct(@Body() updateCartDto: UpdateCartDto, @Request() request): Promise<any> {
        return this.cartService.addProduct(updateCartDto, request);
    }


    @Put(':id/buy')
    buy(@Param('id') id: number): Promise<Order | string> {
        return this.cartService.buy(id);
    }

    @Get()
    findAll(): Promise<Cart[]> {
        return this.cartService.findAll();
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Cart> {
        return this.cartService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.cartService.remove(id);
    }

    @Public()
    @Get(':userId/mycart')
    findCurrentUserCart(@Param('userId') userId: number): Promise<Cart> {
        return this.cartService.findCurrentUserCart(userId);
    }
}
