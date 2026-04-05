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
import { DriversService } from './drivers.service';
import { DriverDto } from './dto/driver.dto';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Get()
  async getAll(
    @Query('searchTerm') searchTerm?: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    return this.driversService.getAll(searchTerm, skip, take);
  }

  @Get('lookup')
  async getLookup() {
    return this.driversService.getLookup();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.driversService.getById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  async createDriver(@Body() dto: DriverDto) {
    return this.driversService.create(dto);
  }

  @HttpCode(200)
  @Put(':id')
  async updateDriver(@Param('id') id: string, @Body() dto: DriverDto) {
    return this.driversService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  async deleteDriver(@Param('id') id: string) {
    return this.driversService.delete(id);
  }
}
