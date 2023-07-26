import {Injectable} from '@nestjs/common';
import {CartService} from "../cart/cart.service";

@Injectable()
export class StatisticsService {

    constructor(private readonly cartService: CartService) {
    }

    async findAll(): Promise<any> {
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
}
