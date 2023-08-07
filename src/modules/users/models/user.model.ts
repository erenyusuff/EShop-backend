import {Column, CreatedAt, DataType, DeletedAt, HasMany, IsEmail, Model, Table, UpdatedAt,} from 'sequelize-typescript';
import {Exclude, Expose} from 'class-transformer';
import {Order} from "../../orders/models/order.model";
import {IsNotEmpty, IsOptional} from "class-validator";
import {Gender} from "../../../shared/enum/gender";
import {Cart} from "../../cart/models/cart.model";

@Exclude()
@Table({
    tableName: 'Users',
})
export class User extends Model {

    @Expose()
    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;
    @IsNotEmpty()
    @Column
    userName: string;

    @IsEmail
    @Expose()
    @Column
    email: string;

    @Column
    password: string;
    @IsOptional()
    @Expose()
    @Column({field: 'first_name'})
    firstName: string;
    @IsOptional()
    @Expose()
    @Column({field: 'last_name'})
    lastName: string;

    @IsOptional()
    @Expose()
    @Column(DataType.DATEONLY)
    birthday: string;
    @IsOptional()
    @Expose()
    @Column({type: DataType.ENUM(Gender.female, Gender.male)})
    gender: Gender;
    @IsOptional()
    @Expose()
    @Column({type: DataType.BIGINT})
    memberGsmNumber: number;

    @CreatedAt
    @Expose()
    @Column({field: 'created_at'})
    createdAt: Date;

    @UpdatedAt
    @Expose()
    @Column({field: 'updated_at'})
    updatedAt: Date;

    @DeletedAt
    @Expose()
    @Column({field: 'deleted_at'})
    deletedAt: Date;

    @HasMany(() => Order, {
        sourceKey: 'id',
        foreignKey: 'userId'
    })
    Orders: Order[];

    @HasMany(() => Cart, {
        sourceKey: 'id',
        foreignKey: 'userId'
    })
    Cart: Cart[];
}

