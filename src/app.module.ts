import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Registry } from './registry/registry.entity';
import { RegistryModule } from './registry/registry.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { InvitationsModule } from './invitations/invitations.module';
import { Invitation } from './invitations/invitations.entity';

@Module({
  imports: [
    UsersModule,
    RegistryModule,
    InvitationsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Registry, Invitation],
      synchronize: true,
      logging: true,
      logger: 'advanced-console',
    }),
    MailerModule.forRoot({
      transport: {
        host: 'xpoczta.hb.pl',
        port: 587,
        secure: false,
        auth: {
          user: 'admin@specroll.pl',
          pass: 'Newworlddisorder1996',
        },
      },
      defaults: {
        from: '"No Reply" <admin@specroll.pl>',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
