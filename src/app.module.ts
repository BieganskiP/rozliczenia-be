import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Registry } from './registry/registry.entity';
import { RegistryModule } from './registry/registry.module';

@Module({
  imports: [
    UsersModule,
    RegistryModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Registry],
      synchronize: true,
      logging: true,
      logger: 'advanced-console',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
