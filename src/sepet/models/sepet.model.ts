import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import {User} from "../../users/models/user.model";

@Table
export class Sepet extends Model {
    @Column
    urunAdi: string;

    @Column
    urunFiyat: string;

    @Column  urunId: number;

    @Column({ defaultValue: true })
    isActive: boolean;

    @HasMany(() => User,{
        sourceKey: 'urunId',
        foreignKey: 'id'
    })
   urunler : User[];


}