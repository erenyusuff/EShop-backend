import {BelongsToMany, Column, HasMany, HasOne, Model, Table} from 'sequelize-typescript';
import {Product} from "../../products/models/product.model";
import {CartProducts} from "./cart-products.model";

@Table
export class Cart extends Model {


    @Column
    totalPrice: number;

    @Column
    userId: number;

    @Column({defaultValue: true})
    isActive: boolean;

    @BelongsToMany(() => Product, {
        through: () => CartProducts,
        foreignKey: 'cartId',
        otherKey: 'productId',
    })
    products: Product[];

    @HasMany(() => CartProducts, {
        sourceKey: 'id',
        foreignKey: 'cartId'
    })
    cartProducts: CartProducts[];

    @HasOne(() => Product, {
        sourceKey: 'id',
        foreignKey: 'productId'
    })
    product: Product;
}
