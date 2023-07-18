import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {CreateCartDto} from './dto/create-cart.dto';
import {Cart} from './models/cart.model';
import {CartProducts} from "./models/cart-products.model";
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class CartService {
    constructor(
        @InjectModel(Cart)
        private readonly cartModel: typeof Cart,
        @InjectModel(CartProducts) private readonly cartProductsModel: typeof CartProducts,
        private readonly ordersService: OrdersService,
    ) {
    }

    async create(model: CreateCartDto): Promise<Cart> {
        const cart = await this.cartModel.create({
            userId: model.userId
        });

        const relations = model.productIds.map(item => {
            console.log('productId', item);
            return {
                cartId: cart.id,
                productId: item,
            };
        });

        await this.cartProductsModel.bulkCreate(relations);


        const foundModel = await this.findOne(cart.id);

        let total = 0;
        foundModel.products.map(item => {
            total = total + item.price;
        });
        foundModel.totalPrice = total;
        await foundModel.save();

        return foundModel;

    }


    async findAll(): Promise<Cart[]> {
        return this.cartModel.findAll();
    }

    findOne(id: number): Promise<Cart> {
        return this.cartModel.findOne({
            where: {
                id,
            },
            include: ['products'],

        });
    }

    async remove(id: number): Promise<void> {
        const cart = await this.findOne(id);
        await cart.destroy();
    }

    buy(cartId: number) {
        //GET cart

        return this.ordersService.create({
            cartId: 1, // TODO buralari doldur
            price: 0,
            userId: 1,
        });
    }
}
