import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Order extends Model {
    @Column
    name: string;

    @Column
    orderId: number;

    @Column
    userId: number;

    @Column({ defaultValue: true })
    isActive: boolean;
}
