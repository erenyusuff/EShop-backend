import {
    Column,
    CreatedAt,
    DataType,
    DeletedAt,
    HasMany,
    IsEmail,
    Model,
    Table,
    Unique,
    UpdatedAt,
} from 'sequelize-typescript';
import {Exclude, Expose} from 'class-transformer';
import {Order} from "../../orders/models/order.model";
import {IsNotEmpty} from "class-validator";

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

    @Expose()
    @Column({field: 'first_name'})
    firstName: string;

    @Expose()
    @Column({field: 'last_name'})
    lastName: string;


    @Expose()
    @Column(DataType.DATEONLY)
    birthday: string;


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
}

