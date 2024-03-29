import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendInviteDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
