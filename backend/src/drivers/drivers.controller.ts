import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriverDto } from './dto/driver.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { PoliciesGuard } from 'src/casl/guard/policies.guard';
import {
  CheckAbility,
  CheckPolicies,
} from 'src/casl/decorators/check-policies.decorator';
import { Action } from 'src/casl/casl-ability.factory';

@Controller('drivers')
@UseGuards(JwtAuthGuard, PoliciesGuard)
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Get()
  @CheckPolicies(new CheckAbility(Action.Read, 'all'))
  async getAll(
    @Query('searchTerm') searchTerm?: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    return this.driversService.getAll(searchTerm, skip, take);
  }

  @Get('lookup')
  @CheckPolicies(new CheckAbility(Action.Read, 'all'))
  async getLookup() {
    return this.driversService.getLookup();
  }

  @Get(':id')
  @CheckPolicies(new CheckAbility(Action.Read, 'all'))
  async getById(@Param('id') id: string) {
    return this.driversService.getById(id);
  }

  @HttpCode(200)
  @Post()
  @CheckPolicies(new CheckAbility(Action.Create, 'all'))
  async createDriver(@Body() dto: DriverDto) {
    return this.driversService.create(dto);
  }

  @HttpCode(200)
  @Put(':id')
  @CheckPolicies(new CheckAbility(Action.Update, 'all'))
  async updateDriver(@Param('id') id: string, @Body() dto: DriverDto) {
    return this.driversService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @CheckPolicies(new CheckAbility(Action.Delete, 'all'))
  async deleteDriver(@Param('id') id: string) {
    return this.driversService.delete(id);
  }
}
