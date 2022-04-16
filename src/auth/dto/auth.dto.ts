import { IsNotEmpty, IsNumber } from 'class-validator';

export class AuthSignUpDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNumber({ allowNaN: false })
  @IsNotEmpty()
  roleId: number;
}

export class AuthLoginDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
