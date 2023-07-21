import {CreateQuantityDto} from "./create-quantity.dto";

export class CreateCartDto {
    totalPrice: number;
    products:CreateQuantityDto[];

}
