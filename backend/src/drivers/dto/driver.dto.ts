import { Transform } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  Length,
  Matches,
} from 'class-validator';

export class DriverDto {
  @Transform(({ value }) => {
    if (typeof value !== 'string') return value;
    const cleaned = value.trim().replace(/\s+/g, ' ');
    return cleaned
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  })
  @Matches(/^[а-яёa-z\-']+(\s+[а-яёa-z\-']+)+$/i, {
    message:
      'ФИО должно содержать как минимум Фамилию и Имя и не содержать цифр',
  })
  @Length(5, 100, { message: 'ФИО должно содержать от 5 до 100 символов' })
  @IsString({ message: 'ФИО должно быть строкой' })
  @IsNotEmpty({ message: 'Введите ФИО' })
  fullName: string;

  @Transform(({ value }) =>
    typeof value === 'string' ? value.replace(/\s/g, '') : value,
  )
  @Matches(/^[0-9]{10}$/, {
    message:
      'Номер удостоверения должен состоять из 10 цифр (пробелы допускаются, но будут удалены)',
  })
  @IsString({ message: 'Номер удостоверения должен быть строкой' })
  @IsNotEmpty({ message: 'Введите номер удостоверения' })
  licenseNumber: string;

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsPhoneNumber('RU', {
    message:
      'Введите корректный российский номер телефона (например, +79991234567 или 89991234567)',
  })
  phone?: string;

  @IsOptional()
  @IsArray({ message: 'Список ТС должен быть массивом' })
  @IsUUID('all', { each: true, message: 'ID ТС должен быть в формате UUID' })
  vehicleIds?: string[];
}
