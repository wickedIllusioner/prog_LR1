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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehicleDto } from './dto/vehicle.dto';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  async getAll(
    @Query('searchTerm') searchTerm?: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    return this.vehiclesService.getAll(searchTerm, skip, take);
  }

  @Get('lookup')
  async getLookup() {
    return this.vehiclesService.getLookup();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.vehiclesService.getById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  async createVehicle(@Body() dto: VehicleDto) {
    return this.vehiclesService.create(dto);
  }

  @HttpCode(200)
  @Put(':id')
  async updateVehicle(@Param('id') id: string, @Body() dto: VehicleDto) {
    return this.vehiclesService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  async deleteVehicle(@Param('id') id: string) {
    return this.vehiclesService.delete(id);
  }
}
