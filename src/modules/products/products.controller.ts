import {Body, Controller, Delete, Get, Param, Patch, Post, Query, Request} from '@nestjs/common';
import {CreateProductDto} from './dto/create-product.dto';
import {ProductsService} from './products.service';
import {Product} from './models/product.model'
import {Public} from "../../core/decorators/public.decorator";
import {PaginateQuery} from "../../core/database/paginate.decorator";
import {PaginateQueryInterface} from "../../core/database/paginate.intercase";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {
    }

    @Public()
    @Post()
    create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productsService.create(createProductDto);
    }

    // @Get('page')
    // findAll(@Query('page')page: string): Promise<Product[]> {
    //     const offset = parseInt(page)
    //     return this.productsService.findAll(offset);
    // }
    @Get('page')
    findAll(@Query('page')page: string, @PaginateQuery('all') paginateQuery?: PaginateQueryInterface,): Promise<Product[]> {
        return this.productsService.findAll(paginateQuery);
    }
    @Public()
    @Get('category')
    findAllByCategory(@Query('category', )category: string, @PaginateQuery('all') paginateQuery?: PaginateQueryInterface): Promise<any> {
        return this.productsService.findAllByCategory(category, paginateQuery);
    }
    // @Public()
    // @Get('category')
    // findAllByCategory(@Query('category')category: string): Promise<any> {
    //     return this.productsService.findAllByCategory(category);
    // }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Product> {
        return this.productsService.findOne(id);
    }

    @Patch()
    update(@Request() req): Promise<Product> {
        return this.productsService.update(req);
    }
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.productsService.remove(id);
    }
}
