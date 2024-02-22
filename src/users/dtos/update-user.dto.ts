import { IsEmail, IsString, IsOptional, IsNumber, IsIn } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  wage?: number;

  @IsString()
  @IsOptional()
  region?: string;

  @IsString()
  @IsOptional()
  car?: string;

  @IsString()
  @IsIn(['user', 'admin'])
  role: string;
}
