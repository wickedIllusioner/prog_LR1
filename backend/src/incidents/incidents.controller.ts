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
import { IncidentsService } from './incidents.service';
import { IncidentDto } from './dto/incident.dto';

@Controller('incidents')
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Get()
  async getAll(
    @Query('searchTerm') searchTerm?: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    return this.incidentsService.getAll(searchTerm, skip, take);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.incidentsService.getById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  async createIncident(@Body() dto: IncidentDto) {
    return this.incidentsService.create(dto);
  }

  @HttpCode(200)
  @Put(':id')
  async updateIncident(@Param('id') id: string, @Body() dto: IncidentDto) {
    return this.incidentsService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  async deleteIncident(@Param('id') id: string) {
    return this.incidentsService.delete(id);
  }
}
