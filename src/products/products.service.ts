import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {CreateProductDto} from "./dto/create-product.dto";
import { Product } from "./models/product.model";
@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product)
        private readonly productModel: typeof Product,
    ) {}

    create(createProductDto: CreateProductDto): Promise<Product> {
        return this.productModel.create({
            orderId : createProductDto.orderId,
            productName: createProductDto.productName,
        });
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.findAll();
    }

    findOne(id: string): Promise<Product> {
        return this.productModel.findOne({
            where: {
                id,
            },
        });
    }

    async remove(id: string): Promise<void> {
        const product = await this.findOne(id);
        await product.destroy();
    }
}
