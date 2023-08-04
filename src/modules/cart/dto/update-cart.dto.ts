import {IsNotEmpty} from "class-validator";

export class UpdateCartDto {
    @IsNotEmpty()
    productId: number;
    @IsNotEmpty()
    quantity: number;

    cartId: number
}
