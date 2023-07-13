import { IsNotEmpty, MinLength, IsString } from 'class-validator';
export class CreateUserDto {

  @IsNotEmpty()
  @MinLength(5)
  @IsString()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  readonly userId: number;
}
