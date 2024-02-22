import { IsEmail, IsString, IsOptional, IsNumber, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  name: string = '';

  @IsNumber()
  @IsOptional()
  wage: number = 0;

  @IsString()
  @IsOptional()
  region: string = '';

  @IsString()
  @IsOptional()
  car: string = '';

  @IsString()
  @IsIn(['user', 'admin'])
  role: string = 'user';
}
