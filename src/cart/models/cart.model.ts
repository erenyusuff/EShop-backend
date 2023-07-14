import {BelongsToMany, Column, Model, Table} from 'sequelize-typescript';
import {Product} from "../../products/models/product.model";
import {CartProducts} from "./cart-products.model";

@Table
export class Cart extends Model {

    @Column
    productId: number;

    @Column
    productIds: number;

    @Column
    totalPrice: number;

    @Column({defaultValue: true})
    isActive: boolean;

    @BelongsToMany(() => Product, {
        through: () => CartProducts,
        foreignKey: 'cartId',
        otherKey: 'productId',
    })
    products: Product[];

}