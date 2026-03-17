import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { EnumPartyRole } from '@prisma/client';

export class InvolvedPartyDto {
  @IsEnum(EnumPartyRole, {
    message: 'Некорректная роль участника. Должна быть CULPRIT или VICTIM',
  })
  role: EnumPartyRole;

  @IsOptional()
  @IsUUID('all', { message: 'ID водителя должен быть UUID' })
  driverId?: string;

  @IsOptional()
  @IsUUID('all', { message: 'ID транспорта должен быть UUID' })
  vehicleId?: string;
}
