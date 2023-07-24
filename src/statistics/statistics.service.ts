import {Inject, Injectable} from '@nestjs/common';
import {CartProducts} from "../cart/models/cart-products.model";
import {Cart} from "../cart/models/cart.model";

@Injectable()
export class StatisticsService {
    @Inject('CartProductRepo')
    private readonly cartProductModel: typeof CartProducts

    async findAll(): Promise<any> {
        const foundModel = await this.findAll();
        let totalSold = 0;
        foundModel.item.product.quantity.map(item => {
            totalSold = item.product.quantity
            console.log('sold', totalSold)
        });
    }
}