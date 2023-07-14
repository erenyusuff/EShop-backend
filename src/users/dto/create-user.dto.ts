import {
    IsEmail,
    IsISO8601,
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    IsString,
    MaxLength,
    MinLength
} from 'class-validator';


export class CreateUserDto {


    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsString()
    @MinLength(6)
    readonly password: string;

    @IsNotEmpty()
    @IsString()
    readonly firstName: string;

    @IsNotEmpty()
    @IsString()
    readonly lastName: string;

    @IsOptional()
    @IsISO8601()
    readonly birthday: string;

    @IsNumberString()
    @MinLength(10, {message: 'number must contain at least 10 digits'})
    @MaxLength(11, {message: 'number should not be more than 11 digits'})
    readonly memberGsmNumber: number;
}
