import {CreateQuantityDto} from "./create-quantity.dto";

export class CreateCartDto {
    userId: number;
    totalPrice: number;
    products: CreateQuantityDto[];

}
