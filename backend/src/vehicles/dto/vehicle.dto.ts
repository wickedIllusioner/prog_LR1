import {
  IsInt,
  IsOptional,
  IsString,
  IsUppercase,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class VehicleDto {
  @IsString({ message: 'VIN должен быть строкой' })
  @Length(17, 17, { message: 'Длина VIN должна составлять ровно 17 символов' })
  @IsUppercase({ message: 'VIN-код должен быть в верхнем регистре' })
  vin: string;

  @IsString()
  @Matches(
    /^[АВЕКМНОРСТУХ]\d{3}[АВЕКМНОРСТУХ]{2}\d{2,3}$|^\d{4}[АВЕКМНОРСТУХ]{2}\d{2,3}$|^[АВЕКМНОРСТУХ]{2}\d{4}\d{2,3}$/,
    {
      message:
        'Номерной знак содержит недопустимые символы или не соответствуют установленным нормам',
    },
  )
  licensePlate: string;

  @IsString()
  @Length(2, 50, { message: 'Длина марки должна быть от 2 до 50 символов' })
  mark: string;

  @IsString()
  @Length(1, 50, { message: 'Длина модели должна быть от 1 до 50 символов' })
  model: string;

  @IsOptional()
  @IsInt({ message: 'Год должен быть целым числом' })
  @Min(1900, { message: 'Год выпуска не может быть раньше 1900' })
  @Max(new Date().getFullYear(), {
    message: 'Год выпуска не может быть в будущем',
  })
  year?: number;
}
