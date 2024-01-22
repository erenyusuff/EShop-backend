import {
    IsEmail,
    IsEnum,
    IsISO8601,
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    IsString,
    MaxLength,
    MinLength
} from 'class-validator';
import {Gender} from "../../../shared/enum/gender";


export class CreateUserDto {

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(15)
    readonly userName: string


    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;

    @IsOptional()
    @IsString()
    readonly firstName: string;

    @IsOptional()
    @IsString()
    readonly lastName: string;

    @IsOptional()
    @IsISO8601()
    readonly birthday: string;

    @IsOptional()
    @IsEnum(Gender)
    readonly gender: Gender;


    readonly role: string

    @IsOptional()
    @IsNumberString()
    @MinLength(10, {message: 'number must contain at least 10 digits'})
    @MaxLength(11, {message: 'number should not be more than 11 digits'})
    readonly memberGsmNumber: number;
}
