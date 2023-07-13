import {Column, HasMany, Model, Table} from 'sequelize-typescript';
import {Product} from "../../products/models/product.model";

@Table
export class Order extends Model {
    @Column
    name: string;

    @Column
    userId: number;

    @Column
    cartId: number;

    @Column
    price: number;

    @Column({ defaultValue: true })
    isActive: boolean;

    @HasMany(() => Product,{
        sourceKey : 'userId',
        foreignKey: 'id'
    })
    Products: Product[];
}
