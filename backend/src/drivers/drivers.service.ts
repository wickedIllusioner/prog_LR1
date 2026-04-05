import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DriverDto } from './dto/driver.dto';

@Injectable()
export class DriversService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(searchTerm?: string, skip?: number, take?: number) {
    if (searchTerm) return this.getSearchTermFilter(searchTerm, skip, take);

    return this.prismaService.driver.findMany({
      orderBy: { createdAt: 'desc' },
      include: { vehicles: { include: { vehicle: true } } },
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
    });
  }

  async getById(id: string) {
    const driver = await this.prismaService.driver.findUnique({
      where: { id },
      select: {
        id: true,
        fullName: true,
        licenseNumber: true,
        phone: true,
        vehicles: {
          select: {
            vehicle: {
              select: {
                id: true,
                mark: true,
                model: true,
                licensePlate: true,
              },
            },
          },
        },
      },
    });

    if (!driver) throw new NotFoundException('Водитель не найден');
    return driver;
  }

  async getLookup() {
    return this.prismaService.driver.findMany({
      select: {
        id: true,
        fullName: true,
        licenseNumber: true,
        vehicles: {
          select: {
            vehicle: true,
          },
        },
      },
    });
  }

  private async getSearchTermFilter(
    searchTerm: string,
    skip?: number,
    take?: number,
  ) {
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
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
    });
  }

  async create(dto: DriverDto) {
    const existingLicense = await this.prismaService.driver.findUnique({
      where: { licenseNumber: dto.licenseNumber },
    });
    if (existingLicense) {
      throw new BadRequestException(
        'Водитель с таким номером удостоверения уже существует',
      );
    }

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

    if (dto.licenseNumber) {
      const conflict = await this.prismaService.driver.findFirst({
        where: {
          licenseNumber: dto.licenseNumber,
          NOT: { id: id },
        },
      });
      if (conflict) {
        throw new BadRequestException(
          `Водитель с удостоверением ${dto.licenseNumber} уже существует`,
        );
      }
    }

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
