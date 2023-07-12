import { Column, Model, Table } from 'sequelize-typescript';

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
}
