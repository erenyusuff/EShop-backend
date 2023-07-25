import {Injectable} from '@nestjs/common';
import {CartService} from "../cart/cart.service";

@Injectable()
export class StatisticsService {

    constructor(private readonly cartService: CartService) {
    }

    async findAll(): Promise<any> {
        const cartProducts = await this.cartService.getCartProducts();
        const productCounter = {cartProducts}
        cartProducts.forEach(item => {
            if (productCounter[item.product.id]) {
                productCounter[item.product.id] += item.quantity
            } else {
                productCounter[item.product.id] = item.quantity;
            }
        });
        return productCounter;
    }
}
