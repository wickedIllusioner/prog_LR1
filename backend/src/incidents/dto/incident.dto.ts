import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EnumIncidentSeverity } from '@prisma/client';
import { InvolvedPartyDto } from './involved-party.dto';

export class IncidentDto {
  @IsDateString(
    {},
    { message: 'Необходимо ввести корректную дату и время инцидента' },
  )
  date: string;

  @IsString({ message: 'Местоположение инцидента должно быть строкой' })
  location: string;

  @IsOptional()
  @IsString({ message: 'Описание должно быть строкой' })
  description?: string;

  @IsEnum(EnumIncidentSeverity, {
    message: 'Некорреткный уровень серьезности инцидента',
  })
  severity: EnumIncidentSeverity;

  @IsArray({ message: 'Список участников инцидента должен быть массивом' })
  @ArrayMinSize(1, {
    message: 'Инцидент должен содержать хотя бы одного участника',
  })
  @ValidateNested({ each: true })
  @Type(() => InvolvedPartyDto)
  involvedParties: InvolvedPartyDto[];
}
