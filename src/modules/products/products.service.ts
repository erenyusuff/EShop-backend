import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {CreateProductDto} from "./dto/create-product.dto";
import {Product} from "./models/product.model";
import {QueryTypes} from "sequelize";

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product)
        private readonly productModel: typeof Product,
    ) {
    }

    create(createProductDto: CreateProductDto): Promise<Product> {
        return this.productModel.create({
            price: createProductDto.price,
            productName: createProductDto.productName,
            stock: createProductDto.stock,
            description: createProductDto.description,
            img: createProductDto.img,
            category: createProductDto.category,
        });
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.findAll();
    }

    async findAllByCategory(category: any): Promise<any> {

        const query = "SELECT * From `Products` Where `category` = "
        const result = await this.productModel.sequelize.query(query, {
            type: QueryTypes.SELECT,
            raw: true,
        });
        return result
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
