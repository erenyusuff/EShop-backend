import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from 'src/products/models/product.model';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import {AuthGuard} from "../auth/auth.guard";
import {APP_GUARD} from "@nestjs/core";

@Module({
    imports: [SequelizeModule.forFeature([Product])],
    providers: [ ProductsService],
    controllers: [ProductsController],
})
export class ProductsModule {}
