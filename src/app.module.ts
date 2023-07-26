import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {UsersModule} from './users/users.module';
import {OrdersModule} from './orders/orders.module';
import {ProductsModule} from './products/products.module';
import {CartModule} from './cart/cart.module';
import {AuthModule} from './auth/auth.module';
import {AuthGuard} from "./auth/auth.guard";
import {APP_GUARD} from "@nestjs/core";
import {StatisticsModule} from './statistics/statistics.module';

@Module({
    imports: [
        SequelizeModule.forRoot({
                dialect: 'mysql',
                host: '127.0.0.1',
                port: 3306,
                username: 'root',
                password: 'Yusuf4757',
                database: 'Cart_Order',
                autoLoadModels: true,
                synchronize: true,
            }
        ),
        UsersModule, OrdersModule, ProductsModule, CartModule, AuthModule, StatisticsModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AppModule {
}
