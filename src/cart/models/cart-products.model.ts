import {Column, Model, Table} from 'sequelize-typescript';

@Table
export class CartProducts extends Model {

    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    userId: number;

    @Column
    cartId: number;

    @Column
    productId: number;

    @Column
    quantity: number;
}