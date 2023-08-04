import {Column, HasOne, Model, Table} from 'sequelize-typescript';
import {Product} from "../../products/models/product.model";
import {IsNotEmpty} from "class-validator";

@Table
export class CartProducts extends Model {

    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;
    @IsNotEmpty()
    @Column
    cartId: number;
    @IsNotEmpty()
    @Column
    productId: number;
    @IsNotEmpty()
    @Column({defaultValue: 1})
    quantity: number;

    @HasOne(() => Product, {
        sourceKey: 'productId',
        foreignKey: 'id'
    })
    product: Product;
}
