import { IsNumber, IsDateString } from 'class-validator';

export class CreateRegistryDto {
  @IsNumber()
  amount: number;

  @IsDateString()
  date: Date;

  @IsNumber()
  wage: number;
}
