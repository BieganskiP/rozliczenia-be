import { Expose } from 'class-transformer';
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
