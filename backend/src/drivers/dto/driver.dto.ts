import {
  IsArray,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  Length,
  Matches,
} from 'class-validator';

export class DriverDto {
  @IsString({ message: 'ФИО должно быть строкой' })
  @Length(5, 100, { message: 'ФИО должно содержать от 5 до 100 символов' })
  fullName: string;

  @IsString({ message: 'Номер удостоверения должен быть строкой' })
  @Matches(/^[0-9]{2}\s[0-9]{2}\s[0-9]{6}$/, {
    message: 'Номер удостоверения должен быть в формате: 77 15 123456',
  })
  licenseNumber: string;

  @IsOptional()
  @IsPhoneNumber('RU', {
    message: 'Введите корректный российский номер телефона',
  })
  @Matches(/^\+7\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}$/, {
    message: 'Номер телефона должен быть в формате: + 7 (999) 123-45-67',
  })
  phone?: string;

  @IsOptional()
  @IsArray({ message: 'Список ТС должен быть массивом' })
  @IsUUID('all', { each: true, message: 'ID ТС должен быть в формате UUID' })
  vehicleIds?: string[];
}
