import {BadRequestException, Inject, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {CreateCartDto} from './dto/create-cart.dto';
import {Cart} from './models/cart.model';
import {CartProducts} from "./models/cart-products.model";
import {OrdersService} from '../orders/orders.service';
import {Product} from "../products/models/product.model";
import sequelize, {QueryTypes} from "sequelize";
import {UpdateCartDto} from "./dto/update-cart.dto";


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
        private readonly cartProductModel: typeof CartProducts,
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

    findCurrentUserCart(userId: number) {
        return this.cartModel.findOne({
            where: {
                userId: userId,
                isActive: true
            },
            include: [{association: 'cartProducts', include: ['product']}]
        })
    }

    async findCurrentUsersCartByToken(request) {
        const userId = request.user.userId;
        const cart = await this.findCurrentUserCart(userId)
        return cart

        // S
        // const query = "SELECT * FROM Carts INNER JOIN Users ON Carts.userId = Users.id WHERE userId = :userId"
        // const result = await this.cartModel.sequelize.query(query, {
        //     type: QueryTypes.SELECT,
        //     replacements: { userId: userId },
        //     raw: true,
        // });
        // return result
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

    async getAllCarts() {
        return this.cartModel.findAll({
            include: [{
                association: 'cartProducts',
                include: ['product'],
            }, {association: 'products'}]
        })
    }

    async findUsersTotal() {
        return this.cartModel.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('totalPrice')), 'TotalSpend'],
                'userId'
            ],
            group: ['userId'],
        })
    }

    async soldTogether(id: number) {
        return this.cartProductsModel.findAll({
            where: {productId: id},
        });

    }

    async addProduct(model: UpdateCartDto, request): Promise<any> {
        const userId = request.user.userId;
        const cart = await this.findCurrentUserCart(userId);

        if (!cart) {
            const createCartDto = {
                products: [{
                    productId: model.productId,
                    quantity: model.quantity
                }]
            };
            return this.create(createCartDto, request)
        }
        const cartProduct = cart.cartProducts.find(item => {
            return item.productId == model.productId;
        })

        if (cartProduct) {
            cartProduct.quantity = cartProduct.quantity + model.quantity;
            await cartProduct.save();
            return cart;
        } else {
            const createdCartProduct = await this.cartProductModel.create({
                cartId: cart.id,
                productId: model.productId,
                quantity: model.quantity,
            });
            cart.cartProducts.push(createdCartProduct);
            return cart;
        }
        // kart icinde bu urun zaten varsa update et sayisin

    }
}

