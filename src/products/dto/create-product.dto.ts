import {IsNotEmpty} from 'class-validator';


export class CreateProductDto {

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    productName: string;

    @IsNotEmpty()
    stock: number;

}
