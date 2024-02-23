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

@Controller('registry')
@UseGuards(AuthGuard)
export class RegistryController {
  constructor(private readonly registryService: RegistryService) {}

  @Get()
  async getAll() {
    return this.registryService.findAll();
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
    return this.registryService.create(createRegistryDto, user.id);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.registryService.delete(+id);
  }

  @Get('/by-user/:user_id')
  getByUserId(@Param('user_id') userId: string) {
    return this.registryService.findByUserId(+userId);
  }

  @Get('/search')
  getByCriteria(
    @Query('user_id', ParseIntPipe) userId: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.registryService.findByCriteria(userId, startDate, endDate);
  }
}
