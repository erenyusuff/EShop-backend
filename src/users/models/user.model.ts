import { Column, Model, Table, HasMany, Unique } from 'sequelize-typescript';
import {Order} from '../../orders/models/order.model'

@Table
export class User extends Model {
  @Unique
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  userId: number;

  @Column({ defaultValue: true })
  isActive: boolean;

  @HasMany(() => Order,{
    sourceKey : 'userId',
    foreignKey: 'id'
  })
  Orders: Order[];


}