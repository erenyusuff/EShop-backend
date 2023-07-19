import {BadRequestException, Inject, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {CreateCartDto} from './dto/create-cart.dto';
import {Cart} from './models/cart.model';
import {CartProducts} from "./models/cart-products.model";
import {OrdersService} from '../orders/orders.service';
import {Product} from "../products/models/product.model";

@Injectable()
export class CartService {
    constructor(
        @InjectModel(Cart)
        private readonly cartModel: typeof Cart,
        @Inject('ProductRepo')
        private readonly productModel: typeof Product,
        @InjectModel(CartProducts) private readonly cartProductsModel: typeof CartProducts,
        private readonly ordersService: OrdersService,
    ) {
    }

    async create(model: CreateCartDto): Promise<Cart> {
        const cart = await this.cartModel.create({
            userId: model.userId
        });

        const relations = model.products.map(item => {
            console.log('id', item);
            return {
                cartId: cart.id,
                quantity: item.quantity,
                productId: item.productId,
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


    async buy(cartId: number) {
            const cart = await this.findOne(cartId);


            cart.products.map((product: any) => {
                if (product.stock < product.CartProducts.quantity) {
                    throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Some error description' })
                }
            })

            let totalPrice = 0;
            cart.products.map((item: any) => {
                totalPrice += item.price * item.CartProducts.quantity;

            });

            return this.ordersService.create({
                cartId: cart.id,
                price: totalPrice,
                userId: cart.userId,

            });

    }
}