import {BelongsToMany, Column, DeletedAt, HasMany, Model, Table} from 'sequelize-typescript';
import {Product} from "../../products/models/product.model";
import {CartProducts} from "./cart-products.model";
import {Expose} from "class-transformer";

@Table
export class Cart extends Model {


    @Column
    totalPrice: number;

    @Column
    userId: number;

    @DeletedAt
    @Expose()
    @Column
    deletedAt: Date;

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

}
