import { Controller } from '@nestjs/common';
import { InvolvedPartiesService } from './involved-parties.service';

@Controller('involved-parties')
export class InvolvedPartiesController {
  constructor(private readonly involvedPartiesService: InvolvedPartiesService) {}
}
