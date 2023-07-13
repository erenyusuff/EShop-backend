import { Column, Model, Table, HasMany, Unique } from 'sequelize-typescript';
import {Order} from '../../orders/models/order.model'

@Table
export class User extends Model {
  @Unique
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @HasMany(() => Order,{
    sourceKey : 'id',
    foreignKey: 'id'
  })
  Orders: Order[];


}