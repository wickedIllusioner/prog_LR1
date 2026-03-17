import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { VehicleDto } from './dto/vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(searchTerm?: string) {
    if (searchTerm) return this.getSearchTermFilter(searchTerm);

    return this.prismaService.vehicle.findMany({});
  }

  async getById(id: string) {
    const vehicle = await this.prismaService.vehicle.findUnique({
      where: { id },
      include: {
        involvedParties: true,
        drivers: {
          include: {
            driver: true,
          },
        },
      },
    });

    if (!vehicle)
      throw new NotFoundException('Транспортное средство не найдено');
    return vehicle;
  }

  private async getSearchTermFilter(searchTerm: string) {
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
    });
  }

  async create(dto: VehicleDto) {
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

    return this.prismaService.vehicle.delete({
      where: { id },
    });
  }
}
