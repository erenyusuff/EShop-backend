import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCartDto } from './dto/create-cart.dto';
import { Cart } from './models/cart.model';

@Injectable()
export class CartService {
    constructor(
        @InjectModel(Cart)
        private readonly cartModel: typeof Cart,
    ) {}

    create(model: CreateCartDto): Promise<Cart> {
        return this.cartModel.create({
            totalPrice: model.totalPrice,
            productId: model.productId,
        });
    }

    async findAll(): Promise<Cart[]> {
        return this.cartModel.findAll();
    }

    findOne(id: string): Promise<Cart> {
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
