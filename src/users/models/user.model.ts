import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import {Order} from '../../orders/models/order.model'
@Table
export class User extends Model {
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
  Users: Order[];


}