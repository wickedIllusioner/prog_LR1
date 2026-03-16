import { Module } from '@nestjs/common';
import { InvolvedPartiesService } from './involved-parties.service';
import { InvolvedPartiesController } from './involved-parties.controller';

@Module({
  controllers: [InvolvedPartiesController],
  providers: [InvolvedPartiesService],
})
export class InvolvedPartiesModule {}
