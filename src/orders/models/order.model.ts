import {Column, HasOne, Model, Table} from 'sequelize-typescript';
import {Cart} from "../../cart/models/cart.model";


@Table
export class Order extends Model {

    @Column
    userId: number;

    @Column
    cartId: number;

    @Column
    price: number;

    @Column({defaultValue: true})
    isActive: boolean;

    @HasOne(() => Cart, {
        sourceKey: 'cartId',
        foreignKey: 'id'
    })
    cart: Cart;

}
