import {Column, Model, Table} from 'sequelize-typescript';


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

}
