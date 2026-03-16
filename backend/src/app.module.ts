import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { InvolvedPartiesModule } from './involved-parties/involved-parties.module';
import { IncidentsModule } from './incidents/incidents.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { DriversModule } from './drivers/drivers.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, DriversModule, VehiclesModule, IncidentsModule, InvolvedPartiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
