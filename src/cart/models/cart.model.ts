import {BelongsToMany, Column, Model, Table} from 'sequelize-typescript';
import {Product} from "../../products/models/product.model";
import {CartProducts} from "./cart-products.model";

@Table
export class Cart extends Model {


    @Column
    totalPrice: number;

    @Column
    userId: string;

    @Column({defaultValue: true})
    isActive: boolean;

    @BelongsToMany(() => Product, {
        through: () => CartProducts,
        foreignKey: 'cartId',
        otherKey: 'productId',
    })
    products: Product[];

}