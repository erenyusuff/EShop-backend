import {BadRequestException, Inject, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {CreateCartDto} from './dto/create-cart.dto';
import {Cart} from './models/cart.model';
import {CartProducts} from "./models/cart-products.model";
import {OrdersService} from '../orders/orders.service';
import {Product} from "../products/models/product.model";
import sequelize from "sequelize";


@Injectable()
export class CartService {
    constructor(
        @InjectModel(Cart)
        private readonly cartModel: typeof Cart,
        @Inject('ProductRepo')
        private readonly productModel: typeof Product,
        @InjectModel(CartProducts) private readonly cartProductsModel: typeof CartProducts,
        private readonly ordersService: OrdersService,
        @Inject('CartProductRepo')
        private readonly cartProductModel: typeof CartProducts
    ) {
    }

    async create(model: CreateCartDto, request: any): Promise<Cart> {
        const cart = await this.cartModel.create({
            userId: request.user.userId
        });

        const relations = model.products.map(item => {
            return {
                cartId: cart.id,
                quantity: item.quantity,
                productId: item.productId,
            };
        });

        await this.cartProductsModel.bulkCreate(relations);
        const foundModel = await this.findOne(cart.id);
        let total = 0;
        foundModel.cartProducts.map(item => {
            total += item.product.price * item.quantity
            console.log('item', item.product.price)
        });
        foundModel.totalPrice = total;
        console.log('price', total);
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
            include: [{
                association: 'cartProducts',
                include: ['product']
            }, {association: 'products'}],

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
                throw new BadRequestException('Something bad happened', {
                    cause: new Error(),
                    description: 'Some error description'
                })
            }
        });
        let totalPrice = 0;
        cart.cartProducts.forEach((cartProduct: CartProducts) => {
            totalPrice += cartProduct.product.price * cartProduct.quantity;
            cartProduct.product.stock = cartProduct.product.stock - cartProduct.quantity;
            cart.isActive = false
            cart.save();
            cartProduct.product.save();
        });

        return this.ordersService.create({
            cartId: cart.id,
            price: totalPrice,
            userId: cart.userId,
        });
    }

    async getCartProducts() {
        return this.cartProductsModel.findAll({
            include: ['product'],
            attributes: [
                [sequelize.fn('sum', sequelize.col('quantity')), 'buyed'],
            ],
            group: ['productId']
        })
    }

    async findUsersTotal() {
        return this.cartModel.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('totalPrice')), 'TotalSpend'],
            ],
            group: ['userId'],
        })
    }
}


