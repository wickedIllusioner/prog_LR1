import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class VehicleDto {
  @Length(2, 50, { message: 'Длина марки должна быть от 2 до 50 символов' })
  @IsString({ message: 'Марка автомобиля должна быть строкой' })
  @IsNotEmpty({ message: 'Введите марку автомобиля' })
  mark: string;

  @Length(1, 50, { message: 'Длина модели должна быть от 1 до 50 символов' })
  @IsString({ message: 'Модель автомобиля должна быть строкой' })
  @IsNotEmpty({ message: 'Введите модель автомобиля' })
  model: string;

  @Transform(({ value }) =>
    typeof value === 'string' ? value.toUpperCase().trim() : value,
  )
  @Matches(
    /^[АВЕКМНОРСТУХABCEHKMOPTXY]\d{3}[АВЕКМНОРСТУХABCEHKMOPTXY]{2}\d{2,3}$|^\d{4}[АВЕКМНОРСТУХABCEHKMOPTXY]{2}\d{2,3}$|^[АВЕКМНОРСТУХABCEHKMOPTXY]{2}\d{4}\d{2,3}$/i,
    {
      message: 'Номерной знак не соответствует формату (например: A123AA77)',
    },
  )
  @IsNotEmpty({ message: 'Введите гос.номер автомобиля' })
  licensePlate: string;

  @Transform(({ value }) =>
    typeof value === 'string' ? value.toUpperCase().trim() : value,
  )
  @Matches(/^[A-HJ-NPR-Z0-9]{17}$/i, {
    message: 'VIN содержит недопустимые символы (I, O, Q не используются)',
  })
  @Length(17, 17, { message: 'Длина VIN должна составлять ровно 17 символов' })
  @IsNotEmpty({
    message:
      'Введите VIN автомобиля (Используются арабские цифры от 0 до 9 и прописные буквы латинского алфавита)',
  })
  @IsString({ message: 'VIN должен быть строкой' })
  vin: string;

  @IsOptional()
  @Min(1900, { message: 'Год выпуска не может быть раньше 1900' })
  @Max(new Date().getFullYear(), {
    message: 'Год выпуска не может быть в будущем',
  })
  @IsInt({ message: 'Год должен быть целым числом' })
  year?: number;
}
