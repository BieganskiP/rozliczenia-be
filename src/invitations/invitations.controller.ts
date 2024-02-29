import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { InvitationService } from './invitations.service';
import { parse } from 'path';

@Controller('invitations')
export class InvitationsController {
  constructor(
    private readonly mailerService: MailerService,
    private readonly invitationService: InvitationService,
  ) {}

  @Post('/send-invite')
  async sendInvite(@Body('email') email: string) {
    const invitation = await this.invitationService.createInvitation(email);

    const signupLink = `https://rozliczenia.vercel.app/invitation/${invitation.token}`;

    // Send the invitation email
    await this.mailerService.sendMail({
      to: email,
      subject: 'Your Invitation to Sign Up',
      text: `You've been invited to sign up. Please use the following link: ${signupLink}`,
    });

    return { message: 'Invitation sent successfully.' };
  }

  @Get(':token')
  async getInvitation(@Param('token') token: string) {
    const invitation = await this.invitationService.getInvitationByToken(token);
    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    return invitation;
  }

  @Delete('/delete-invite/:id')
  deleteInvitation(@Param('id') id: string) {
    return this.invitationService.remove(parseInt(id));
  }
}
