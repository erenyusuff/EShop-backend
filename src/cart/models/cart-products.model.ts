import {Column, HasOne, Model, Table} from 'sequelize-typescript';
import {Product} from "../../products/models/product.model";

@Table
export class CartProducts extends Model {

    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Column
    cartId: number;

    @Column
    productId: number;

    @Column
    quantity: number;

    @HasOne(() => Product, {
        sourceKey: 'productId',
        foreignKey: 'id'
    })
    product: Product;
}