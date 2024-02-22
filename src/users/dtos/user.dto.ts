import { Expose } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  wage: number;

  @Expose()
  region: string;

  @Expose()
  car: string;

  @Expose()
  role?: string;

  @Expose()
  message?: string;
}
