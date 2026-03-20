import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { VehicleDto } from './dto/vehicle.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class VehiclesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(searchTerm?: string, skip?: number, take?: number) {
    if (searchTerm) return this.getSearchTermFilter(searchTerm, skip, take);

    return this.prismaService.vehicle.findMany({
      orderBy: { createdAt: 'desc' },
      include: { drivers: { include: { driver: true } } },
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
    });
  }

  async getById(id: string) {
    const vehicle = await this.prismaService.vehicle.findUnique({
      where: { id },
      select: {
        id: true,
        vin: true,
        licensePlate: true,
        mark: true,
        model: true,
        year: true,
        drivers: {
          select: {
            driver: {
              select: {
                id: true,
                fullName: true,
                licenseNumber: true,
              },
            },
          },
        },
      },
    });

    if (!vehicle)
      throw new NotFoundException('Транспортное средство не найдено');
    return vehicle;
  }

  async getLookup() {
    return this.prismaService.vehicle.findMany({
      select: {
        id: true,
        licensePlate: true,
        mark: true,
        model: true,
      },
    });
  }

  private async getSearchTermFilter(
    searchTerm: string,
    skip?: number,
    take?: number,
  ) {
    return this.prismaService.vehicle.findMany({
      where: {
        OR: [
          {
            vin: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            licensePlate: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            mark: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      },
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
    });
  }

  async create(dto: VehicleDto) {
    const existingVin = await this.prismaService.vehicle.findUnique({
      where: { vin: dto.vin },
    });
    if (existingVin) {
      throw new BadRequestException(
        `Транспорт с VIN ${dto.vin} уже зарегистрирован`,
      );
    }

    const existingPlate = await this.prismaService.vehicle.findUnique({
      where: { licensePlate: dto.licensePlate },
    });
    if (existingPlate) {
      throw new BadRequestException(
        `Автомобиль с номером ${dto.licensePlate} уже есть в базе`,
      );
    }

    return this.prismaService.vehicle.create({
      data: {
        ...dto,
      },
      include: {
        drivers: true,
      },
    });
  }

  async update(id: string, dto: VehicleDto) {
    await this.getById(id);

    const vinConflict = await this.prismaService.vehicle.findFirst({
      where: {
        vin: dto.vin,
        NOT: { id: id },
      },
    });
    if (vinConflict) {
      throw new BadRequestException(
        `VIN ${dto.vin} уже принадлежит другому ТС`,
      );
    }

    const plateConflict = await this.prismaService.vehicle.findFirst({
      where: {
        licensePlate: dto.licensePlate,
        NOT: { id: id },
      },
    });
    if (plateConflict) {
      throw new BadRequestException(
        `Номер ${dto.licensePlate} уже занят другим ТС`,
      );
    }

    return this.prismaService.vehicle.update({
      where: { id },
      data: {
        ...dto,
      },
      include: {
        drivers: true,
      },
    });
  }

  async delete(id: string) {
    await this.getById(id);

    try {
      return this.prismaService.vehicle.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException(
            'Нельзя удалить транспорт, так как он закреплен за водителем',
          );
        }
      }
      throw error;
    }
  }
}
