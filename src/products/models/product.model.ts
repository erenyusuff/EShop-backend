import { Column, Model, Table} from 'sequelize-typescript';

@Table
export class Product extends Model {
    @Column
    productName: string;

    @Column
    price: number;


}
