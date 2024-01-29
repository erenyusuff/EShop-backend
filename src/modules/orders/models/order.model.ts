import {Column, HasOne, Model, Table} from 'sequelize-typescript';
import {Cart} from "../../cart/models/cart.model";
import {User} from "../../users/models/user.model";


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

    @Column
    status: string;

    @HasOne(() => Cart, {
        sourceKey: 'cartId',
        foreignKey: 'id'
    })
    cart: Cart;

    @HasOne(() => User, {
        sourceKey: 'userId',
        foreignKey: 'id'
    })
    user: User;


}
