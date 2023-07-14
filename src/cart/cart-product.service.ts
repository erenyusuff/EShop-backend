import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCartProductsDto } from './dto/create-cart_products.dto';
import { CartProducts } from './models/cart-products.model';

@Injectable()
export class CartProductsService {
    constructor(
        @InjectModel(CartProducts)
        private readonly cartModel: typeof CartProducts,
    ) {}

    create(model: CreateCartProductsDto): Promise<CartProducts> {
        return this.cartModel.create({
            cartId: model.cartId,
            productId: model.productId,
            userId: model.userId,
            price: model.price,
        });
    }

    async findAll(): Promise<CartProducts[]> {
        return this.cartModel.findAll();
    }

    findOne(id: string): Promise<CartProducts> {
        return this.cartModel.findOne({
            where: {
                id,
            },
            include: ['products'],

        });
    }

    async remove(id: string): Promise<void> {
        const cart = await this.findOne(id);
        await cart.destroy();
    }
}
