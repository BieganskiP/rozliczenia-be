import { Expose } from 'class-transformer';

export class RegistryDto {
  @Expose()
  id: number;

  @Expose()
  date: Date;

  @Expose()
  amount: number;

  @Expose()
  user_id: number;

  @Expose()
  wage: number;
}
