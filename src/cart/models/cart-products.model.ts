import { Column, Model, Table, HasMany} from 'sequelize-typescript';
import {User} from "../../users/models/user.model";

@Table
export class CartProducts extends Model {

    @Column
    cartId: number;

    @Column
    productId: number;

    @Column
    totalPrice: number;


}