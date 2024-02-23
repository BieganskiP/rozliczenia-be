import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistryService } from './registry.service';
import { RegistryController } from './registry.controller';
import { Registry } from './registry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Registry])],
  providers: [RegistryService],
  controllers: [RegistryController],
})
export class RegistryModule {}
