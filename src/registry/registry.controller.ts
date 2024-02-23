import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { RegistryService } from './registry.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateRegistryDto } from './dtos/create-registry.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { RegistryDto } from './dtos/registry.dto';

@Controller('registry')
@UseGuards(AuthGuard)
@Serialize(RegistryDto)
export class RegistryController {
  constructor(private readonly registryService: RegistryService) {}

  @Get()
  async getAll() {
    return this.registryService.findAll();
  }

  @Get('/search')
  async getByCriteria(
    @Query('user_id') userId: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.registryService.findByCriteria(+userId, startDate, endDate);
  }

  @Get('/:id')
  getOne(@Param('id', ParseIntPipe) id: string) {
    return this.registryService.findOne(+id);
  }

  @Post()
  create(
    @Body() createRegistryDto: CreateRegistryDto,
    @CurrentUser() user: User,
  ) {
    return this.registryService.create(createRegistryDto, user.id, user.wage);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: string) {
    return this.registryService.delete(+id);
  }

  @Get('/by-user/:user_id')
  getByUserId(@Param('user_id', ParseIntPipe) userId: string) {
    return this.registryService.findByUserId(+userId);
  }
}
