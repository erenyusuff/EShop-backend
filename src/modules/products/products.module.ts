import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Product} from 'src/modules/products/models/product.model';
import {ProductsController} from './products.controller';
import {ProductsService} from './products.service';

@Module({
    imports: [SequelizeModule.forFeature([Product])],
    providers: [ProductsService],
    controllers: [ProductsController],
})
export class ProductsModule {
}
