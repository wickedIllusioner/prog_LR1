import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DriverDto } from './dto/driver.dto';
import { VehicleAssignment } from '@prisma/client';

@Injectable()
export class DriversService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(searchTerm?: string) {
    if (searchTerm) return this.getSearchTermFilter(searchTerm);

    return this.prismaService.driver.findMany({});
  }

  async getById(id: string) {
    const driver = await this.prismaService.driver.findUnique({
      where: { id },
      include: {
        involvedParties: true,
        vehicles: {
          include: {
            vehicle: true,
          },
        },
      },
    });

    if (!driver) throw new NotFoundException('Водитель не найден');
    return driver;
  }

  private async getSearchTermFilter(searchTerm: string) {
    return this.prismaService.driver.findMany({
      where: {
        OR: [
          {
            fullName: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            licenseNumber: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  async assignVehicle(
    driverId: string,
    vehicleId: string,
  ): Promise<VehicleAssignment> {
    try {
      return await this.prismaService.vehicleAssignment.upsert({
        where: {
          driverId_vehicleId: { driverId, vehicleId },
        },
        create: { driverId, vehicleId },
        update: {},
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Ошибка при назначении ТС водителю',
      );
    }
  }

  async create(dto: DriverDto) {
    const { vehicleIds, ...driverData } = dto;

    return this.prismaService.driver.create({
      data: {
        ...driverData,
        vehicles: {
          create: vehicleIds?.map((vId) => ({
            vehicleId: vId,
          })),
        },
      },
      include: {
        vehicles: true,
      },
    });
  }

  async update(id: string, dto: DriverDto) {
    const { vehicleIds, ...driverData } = dto;

    await this.getById(id);

    return this.prismaService.driver.update({
      where: { id },
      data: {
        ...driverData,
        vehicles: {
          deleteMany: {},
          create: vehicleIds?.map((vId) => ({
            vehicleId: vId,
          })),
        },
      },
      include: {
        vehicles: true,
      },
    });
  }

  async delete(id: string) {
    await this.getById(id);

    return this.prismaService.driver.delete({
      where: { id },
    });
  }
}
