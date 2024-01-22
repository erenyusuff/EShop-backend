import {Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Request} from '@nestjs/common';
import {CreateProductDto} from './dto/create-product.dto';
import {ProductsService} from './products.service';
import {Product} from './models/product.model'
import {Public} from "../../core/decorators/public.decorator";
import {UpdateProductDto} from "./dto/update-product.dto";

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

    @Patch(':id')
    update(@Request() req,@Param('id') id: number): Promise<Product> {
        return this.productsService.update(req,id);
    }
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.productsService.remove(id);
    }
}
