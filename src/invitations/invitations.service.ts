import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invitation } from './invitations.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(Invitation)
    private invitationRepository: Repository<Invitation>,
  ) {}

  async createInvitation(email: string): Promise<Invitation> {
    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const invitation = this.invitationRepository.create({
      email,
      token,
      createdAt: new Date(),
      expiresAt,
    });

    await this.invitationRepository.save(invitation);

    return invitation;
  }

  async getInvitationByToken(token: string): Promise<Invitation | undefined> {
    return this.invitationRepository.findOne({
      where: { token },
    });
  }

  async remove(id: number): Promise<void> {
    await this.invitationRepository.delete(id);
  }
}
