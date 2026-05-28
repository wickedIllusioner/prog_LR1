import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IncidentsService } from './incidents.service';
import { IncidentDto } from './dto/incident.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { PoliciesGuard } from 'src/casl/guard/policies.guard';
import {
  CheckAbility,
  CheckPolicies,
} from 'src/casl/decorators/check-policies.decorator';
import { Action } from 'src/casl/casl-ability.factory';
import { FtpService } from 'src/shared/ftp.service';

@Controller('incidents')
@UseGuards(JwtAuthGuard, PoliciesGuard)
export class IncidentsController {
  constructor(
    private readonly incidentsService: IncidentsService,
    private readonly ftpService: FtpService,
  ) {}

  @Get()
  @CheckPolicies(new CheckAbility(Action.Read, 'all'))
  async getAll(
    @Query('searchTerm') searchTerm?: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    return this.incidentsService.getAll(searchTerm, skip, take);
  }

  @Get(':id')
  @CheckPolicies(new CheckAbility(Action.Read, 'all'))
  async getById(@Param('id') id: string) {
    return this.incidentsService.getById(id);
  }

  @HttpCode(200)
  @Post()
  @CheckPolicies(new CheckAbility(Action.Create, 'all'))
  async createIncident(@Body() dto: IncidentDto) {
    return this.incidentsService.create(dto);
  }

  @HttpCode(200)
  @Put(':id')
  @CheckPolicies(new CheckAbility(Action.Update, 'all'))
  async updateIncident(@Param('id') id: string, @Body() dto: IncidentDto) {
    return this.incidentsService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @CheckPolicies(new CheckAbility(Action.Delete, 'all'))
  async deleteIncident(@Param('id') id: string) {
    return this.incidentsService.delete(id);
  }

  @HttpCode(200)
  @Post('upload-photo')
  @CheckPolicies(new CheckAbility(Action.Create, 'all'))
  @UseInterceptors(FileInterceptor('photo'))
  async uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Файл не был передан');
    }

    const fileName = await this.ftpService.uploadFile(
      file.buffer,
      file.originalname,
    );

    return { fileName };
  }
}
