import {Column, Model, Table, HasMany, BelongsToMany} from 'sequelize-typescript';
import {User} from "../../users/models/user.model";
import {Product} from "../../products/models/product.model";
import {CartProducts} from "./cart-products.model";

@Table
export class Cart extends Model {

    @Column
    userId: number;

    @Column
    totalPrice: number;

    @Column({ defaultValue: true })
    isActive: boolean;

    @BelongsToMany(() => Product, {
        through: () => CartProducts,
        foreignKey: 'cartId',
        otherKey: 'productId',
    })
    products: Product[];

}