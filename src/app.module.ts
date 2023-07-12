import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import  { OrdersModule } from './orders/orders.module'
import { ProductsModule } from './products/products.module'
import {SepetModule} from "./sepet/sepet.module";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'Yusuf4757',
      database: 'test',
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,OrdersModule,ProductsModule,SepetModule
  ],
})
export class AppModule {}
