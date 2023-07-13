import { IsNotEmpty, MinLength, IsString } from 'class-validator';
export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;


}
