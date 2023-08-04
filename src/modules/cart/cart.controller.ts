import {Body, Controller, Delete, Get, Param, Post, Put, Request} from '@nestjs/common';
import {Cart} from 'src/modules/cart/models/cart.model';
import {CartService} from 'src/modules/cart/cart.service';
import {CreateCartDto} from "./dto/create-cart.dto";
import {Order} from "../orders/models/order.model";
import {Public} from "../../core/decorators/public.decorator";
import {UpdateCartDto} from "./dto/update-cart.dto";

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

    @Public()
    @Put(':id/addToCart')
    addProduct(@Body() updateCartDto: UpdateCartDto, @Param('id') id: number, @Request() request): Promise<any> {
        console.log(id)
        return this.cartService.addProduct(id, updateCartDto)
    }


    @Put(':id/buy')
    buy(@Param('id') id: number): Promise<Order | string> {
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
