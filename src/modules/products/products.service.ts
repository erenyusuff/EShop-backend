import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {CreateProductDto} from "./dto/create-product.dto";
import {Product} from "./models/product.model";
import {PaginationService} from "../../core/database/pagination.service";
import {PaginateQueryInterface} from "../../core/database/paginate.intercase";

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

    update(req: any): Promise<any> {
        console.log(req.body.id)
        return this.productModel.update(req.body,{
            where: {id: req.body.id},
        });
    }
    // async findAll(offset: number): Promise<Product[]> {
    //     const limit = 2
    //     console.log('page', offset)
    //     offset = (offset-1) * limit
    //     console.log('offset',offset)
    //     const query = "SELECT * From `Products` Limit :limit Offset :offset"
    //     return await this.productModel.sequelize.query(query, {
    //         type: QueryTypes.SELECT,
    //         replacements: {offset, limit},
    //         raw: true,
    //     })
    // }
    async findAll(paginateQuery?: PaginateQueryInterface): Promise<Product[]> {
        return PaginationService.findAllPaginate({
            ...paginateQuery,
            model: this.productModel,
        });
    }

    // async findAllByCategory(category: string): Promise<any> {
    //     const query = "SELECT * From `Products` Where `category` = :category"
    //     const result = await this.productModel.sequelize.query(query, {
    //         type: QueryTypes.SELECT,
    //         replacements: {category},
    //         raw: true,
    //     });
    //     return result
    // }
    async findAllByCategory(category: string, paginateQuery?: PaginateQueryInterface): Promise<any> {
        return PaginationService.findAllPaginate({
            ...paginateQuery,
            model: this.productModel,
        }
        );
    }

    async getIds(id: number) {
        return this.productModel.findAll({
            where: {id: id},
        });


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
