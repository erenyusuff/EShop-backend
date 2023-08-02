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

    async soldTogether(id: number): Promise<any> {
        let cartIds: any = {};
        const productCounter = {};
        let allCartProducts = await this.cartService.getAllCarts()
        let cartProducts = await this.cartService.soldTogether(id);
        const relatedCarts = cartProducts.map((item) => {
            if (productCounter[item.productId]) {
                productCounter[item.productId] += item.quantity;
                cartIds = item.cartId
                console.log(cartIds)
                allCartProducts.map(item => {
                    }
                )
            } else {
                productCounter[item.productId] = item.quantity;
                cartIds = item.cartId
                console.log(cartIds)
                allCartProducts.map(item => {
                })
            }
        });
        return Object.entries(productCounter).sort(function (a: any, b: any) {
            return b[1] - a[1];
        });
    }
}
