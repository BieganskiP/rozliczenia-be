import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registry } from './registry.entity';
import { CreateRegistryDto } from './dtos/create-registry.dto';
import { Between, FindOptionsWhere } from 'typeorm';

@Injectable()
export class RegistryService {
  constructor(
    @InjectRepository(Registry)
    private registryRepository: Repository<Registry>,
  ) {}

  async findAll(): Promise<Registry[]> {
    return this.registryRepository.find();
  }

  async findOne(id: number): Promise<Registry> {
    if (isNaN(id)) {
      throw new Error('Invalid ID');
    }

    const registry = await this.registryRepository.findOneBy({ id });
    if (!registry) {
      throw new NotFoundException(`Registry entry with ID "${id}" not found.`);
    }
    return registry;
  }

  async create(
    createRegistryDto: CreateRegistryDto,
    userId: number,
  ): Promise<Registry> {
    const registry = this.registryRepository.create({
      ...createRegistryDto,
      user_id: userId,
    });

    return this.registryRepository.save(registry);
  }

  async findByUserId(userId: number): Promise<Registry[]> {
    return this.registryRepository.find({
      where: { user_id: userId },
    });
  }

  async findByCriteria(
    userId: number,
    startDate?: string,
    endDate?: string,
  ): Promise<Registry[]> {
    const where: FindOptionsWhere<Registry> = {};

    if (userId) where.user_id = userId;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      where.date = Between(start, end);
    }

    return this.registryRepository.find({ where });
  }

  async delete(id: number): Promise<void> {
    const result = await this.registryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Registry entry with ID "${id}" not found.`);
    }
  }
}
