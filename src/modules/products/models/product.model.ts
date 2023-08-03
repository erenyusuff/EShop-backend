import {Column, Model, Table} from 'sequelize-typescript';
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

@Table
export class Product extends Model {
    @IsString()
    @IsNotEmpty()
    @Column
    productName: string;

    @IsNumber()
    @IsNotEmpty()
    @Column
    price: number;

    @IsNumber()
    @IsNotEmpty()
    @Column
    stock: number;

    @IsNumber()
    @IsNotEmpty()
    @Column
    description: string;

    @Column
    img: string;

    @Column
    @IsNotEmpty()
    category: string;

    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;
}
