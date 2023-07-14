import { Column, Model, Table, HasMany} from 'sequelize-typescript';
import {User} from "../../users/models/user.model";

@Table
export class CartProducts extends Model {

    @Column
    userId: number;

    @Column
    cartId: number;

    @Column
    productId: number;

    @Column
    price: number;



    @Column({ defaultValue: true })
    isActive: boolean;

    @HasMany(() => User,{
        sourceKey: 'userId',
        foreignKey: 'id'
    })
    urunler : User[];


}