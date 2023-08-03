import {Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';
import {CreateProductDto} from './dto/create-product.dto';
import {ProductsService} from './products.service';
import {Product} from './models/product.model'
import {Public} from "../../core/decorators/public.decorator";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {
    }

    @Public()
    @Post()
    create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productsService.create(createProductDto);
    }

    @Get()
    findAll(): Promise<Product[]> {
        return this.productsService.findAll();
    }
    @Public()
    @Get('category')
    findAllByCategory(@Query('category')category: string): Promise<any> {
        return this.productsService.findAllByCategory(category);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Product> {
        return this.productsService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.productsService.remove(id);
    }
}
