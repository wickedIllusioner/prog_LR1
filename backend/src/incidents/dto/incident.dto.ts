import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
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
  @IsNotEmpty({ message: 'Укажите время и дату инцидента' })
  date: string;

  @IsString({ message: 'Местоположение инцидента должно быть строкой' })
  @IsNotEmpty({ message: 'Укажите местоположение инцидента' })
  location: string;

  @IsOptional()
  @IsString({ message: 'Описание должно быть строкой' })
  description?: string;

  @IsOptional()
  @IsEnum(EnumIncidentSeverity, {
    message: 'Некорректный уровень серьезности инцидента',
  })
  severity?: EnumIncidentSeverity;

  @IsOptional()
  @IsString()
  photoUrl?: string;

  @ValidateNested({ each: true })
  @Type(() => InvolvedPartyDto)
  @ArrayMinSize(1, {
    message: 'Инцидент должен содержать хотя бы одного участника',
  })
  @IsArray({ message: 'Список участников инцидента должен быть массивом' })
  involvedParties: InvolvedPartyDto[];
}
