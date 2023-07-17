import {Column, Model, Table} from 'sequelize-typescript';

@Table
export class CartProducts extends Model {

    @Column
    userId: number;

    @Column
    cartId: number;

    @Column
    productId: number;


}