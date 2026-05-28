import { Module } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { IncidentsController } from './incidents.controller';
import { AuthModule } from 'src/auth/auth.module';
import { FtpService } from 'src/shared/ftp.service';

@Module({
  imports: [AuthModule],
  controllers: [IncidentsController],
  providers: [IncidentsService, FtpService],
})
export class IncidentsModule {}
