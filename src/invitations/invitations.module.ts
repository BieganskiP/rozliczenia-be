import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationsController } from './invitations.controller';
import { InvitationService } from './invitations.service';
import { Invitation } from './invitations.entity';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [TypeOrmModule.forFeature([Invitation]), MailerModule],
  controllers: [InvitationsController],
  providers: [InvitationService],
})
export class InvitationsModule {}
