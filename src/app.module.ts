import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import  { OrdersModule } from './orders/orders.module'
import { ProductsModule } from './products/products.module'

import {User} from "./users/models/user.model";
import {Order} from "./orders/models/order.model";
import {Product} from "./products/models/product.model";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'Yusuf4757',
      database: 'test',
      entities: [User,Order,Product],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,OrdersModule,ProductsModule
  ],
})
export class AppModule {}
