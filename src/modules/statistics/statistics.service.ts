import {Injectable} from '@nestjs/common';
import {CartService} from "../cart/cart.service";

@Injectable()
export class StatisticsService {

    constructor(
        private readonly cartService: CartService,
    ) {
    }

    async findAll(): Promise<any> {
        // sequelize version: return this.cartService.getCartProducts()
        const cartProducts = await this.cartService.getCartProducts();
        let totalrevenue = {}
        const productCounter = {cartProducts, totalrevenue};
        cartProducts.forEach(item => {


            if (productCounter[item.product.id]) {
                productCounter[item.product.id] += item.quantity
                totalrevenue = item.product.price * item.quantity
            } else {
                productCounter[item.product.id] = item.quantity;
                totalrevenue = item.product.price * item.dataValues.buyed
            }
            console.log(totalrevenue, item.product.id)


        });
        return productCounter
    }

    async findUsersTotal(): Promise<any> {
        // const total = await this.cartService.findUsersTotal()
        return this.cartService.findUsersTotal()
    }

    async w(): Promise<any> {
        const cartProducts = await this.cartService.getCartProducts();
        const cartProductss = await this.cartService.w();
        let totalrevenue = {}
        const productCounter = {cartProducts};
        cartProducts.forEach(item => {
                // console.log('Cart Id', item.cartId == 4, 'product Id', item.productId, 'sold', item.quantity, item.product.productName)
                // console.log(item.productId == 1, item.cartId, item.dataValues.quantity)

                if (productCounter[item.product.id]) {
                    productCounter[item.product.id] += item.quantity
                    totalrevenue = item.product.price * item.quantity
                } else {
                    productCounter[item.product.id] = item.quantity;
                    totalrevenue = item.product.price * item.dataValues.buyed
                }
                console.log(totalrevenue, item.product.id)
            }
        )
        return productCounter
    }

}

