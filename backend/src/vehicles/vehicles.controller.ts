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
import { VehiclesService } from './vehicles.service';
import { VehicleDto } from './dto/vehicle.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { PoliciesGuard } from 'src/casl/guard/policies.guard';
import {
  CheckAbility,
  CheckPolicies,
} from 'src/casl/decorators/check-policies.decorator';
import { Action } from 'src/casl/casl-ability.factory';

@Controller('vehicles')
@UseGuards(JwtAuthGuard, PoliciesGuard)
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  @CheckPolicies(new CheckAbility(Action.Read, 'all'))
  async getAll(
    @Query('searchTerm') searchTerm?: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    return this.vehiclesService.getAll(searchTerm, skip, take);
  }

  @Get('lookup')
  @CheckPolicies(new CheckAbility(Action.Read, 'all'))
  async getLookup() {
    return this.vehiclesService.getLookup();
  }

  @Get(':id')
  @CheckPolicies(new CheckAbility(Action.Read, 'all'))
  async getById(@Param('id') id: string) {
    return this.vehiclesService.getById(id);
  }

  @HttpCode(200)
  @Post()
  @CheckPolicies(new CheckAbility(Action.Create, 'all'))
  async createVehicle(@Body() dto: VehicleDto) {
    return this.vehiclesService.create(dto);
  }

  @HttpCode(200)
  @Put(':id')
  @CheckPolicies(new CheckAbility(Action.Update, 'all'))
  async updateVehicle(@Param('id') id: string, @Body() dto: VehicleDto) {
    return this.vehiclesService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @CheckPolicies(new CheckAbility(Action.Delete, 'all'))
  async deleteVehicle(@Param('id') id: string) {
    return this.vehiclesService.delete(id);
  }
}
