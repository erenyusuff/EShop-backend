import {IsNumber, IsString} from 'class-validator';


export class UpdateProductDto {

    @IsNumber()
    price: number;

    @IsString()
    productName: string;

    @IsNumber()
    stock: number;

    description: number;

    img: string;

    @IsString()
    category: string;
}
