import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Sepet } from 'src/cart/models/cart.model';
import { CartService } from 'src/cart/cart.service';
import {CreateCartDto} from "./dto/create-cart.dto";

@Controller('Sepet')
export class CartController {
    constructor(private readonly sepetService: CartService) {}

    @Post()
    create(@Body() createSepetDto: CreateCartDto): Promise<Sepet> {
        return this.sepetService.create(createSepetDto);
    }

    @Get()
    findAll(): Promise<Sepet[]> {
        return this.sepetService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Sepet> {
        return this.sepetService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.sepetService.remove(id);
    }
}
