import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {CreateCartDto} from './dto/create-cart.dto';
import {Cart} from './models/cart.model';
import {CartProducts} from "./models/cart-products.model";
@Injectable()
export class CartService {
    constructor(
        @InjectModel(Cart) private readonly cartModel: typeof Cart,
        @InjectModel(CartProducts) private readonly cartProductsModel: typeof CartProducts,
    ) {
    }

    async create(model: CreateCartDto): Promise<Cart> {
        const cart = await this.cartModel.create({
            // totalPrice: model.totalPrice,
        });

        const relations = model.productIds.map(item => {
            console.log('productId', item);
            return {
              cartId: cart.id,
              productId: item
            };
        });

       await this.cartProductsModel.bulkCreate(relations);


        const foundModel =  await this.findOne(cart.id);

         let total = 0;
        foundModel.products.map(item=>{
             total = total + item.price;
         });
         foundModel.totalPrice = total;
         await foundModel.save();

        return foundModel;
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
