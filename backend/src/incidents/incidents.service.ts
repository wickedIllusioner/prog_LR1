import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IncidentDto } from './dto/incident.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class IncidentsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailerService: MailerService,
  ) {}

  async getAll(searchTerm?: string, skip?: number, take?: number) {
    if (searchTerm) return this.getSearchTermFilter(searchTerm, skip, take);

    return this.prismaService.incident.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        date: true,
        location: true,
        description: true,
        severity: true,
      },
    });
  }

  async getById(id: string) {
    const incident = await this.prismaService.incident.findUnique({
      where: { id },
      select: {
        id: true,
        date: true,
        location: true,
        description: true,
        severity: true,
        involvedParties: {
          select: {
            role: true,
            driverId: true,
            vehicleId: true,
            driver: {
              select: {
                fullName: true,
                licenseNumber: true,
              },
            },
            vehicle: {
              select: {
                licensePlate: true,
                mark: true,
                model: true,
              },
            },
          },
        },
      },
    });

    if (!incident) throw new NotFoundException('Инцидент не найден');
    return incident;
  }

  private async getSearchTermFilter(
    searchTerm: string,
    skip?: number,
    take?: number,
  ) {
    return this.prismaService.incident.findMany({
      where: {
        OR: [
          { location: { contains: searchTerm, mode: 'insensitive' } },
          {
            involvedParties: {
              some: {
                OR: [
                  {
                    driver: {
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
                  },
                  {
                    vehicle: {
                      OR: [
                        { vin: { contains: searchTerm, mode: 'insensitive' } },
                        {
                          licensePlate: {
                            contains: searchTerm,
                            mode: 'insensitive',
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      include: {
        involvedParties: {
          include: { driver: true, vehicle: true },
        },
      },
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      // select: { date: true, location: true, description: true },
    });
  }

  async create(dto: IncidentDto) {
    const { involvedParties, ...incidentData } = dto;

    const targetEmail = 'veselovka47@gmail.com';

    try {
      await this.mailerService.sendMail({
        to: targetEmail,
        subject: `Новое ДТП: ${dto.location}`,
        text: `Зарегистрировано новое ДТП.\nУровень серьезности: ${dto.severity}`,
        html: `
          <h3>Зарегистрировано новое ДТП</h3>
          <p><strong>Уровень серьезности:</strong> ${dto.severity}</p>
          <p><strong>Место:</strong> ${dto.location}</p>
          <p><strong>Дата:</strong> ${new Date(dto.date).toLocaleString('ru-RU')}</p>
          <p><strong>Описание:</strong> ${dto.description || 'Не указано'}</p>
        `,
      });
      console.log(`Письмо отправлено на ${targetEmail}`);
    } catch (error) {
      console.error(`Ошибка при отправке письма: ${error}`);
    }

    return this.prismaService.incident.create({
      data: {
        ...incidentData,
        date: new Date(dto.date),
        involvedParties: {
          create: involvedParties.map((party) => ({
            role: party.role,
            driverId: party.driverId,
            vehicleId: party.vehicleId,
          })),
        },
      },
      include: {
        involvedParties: true,
      },
    });
  }

  async update(id: string, dto: IncidentDto) {
    const { involvedParties, ...incidentData } = dto;

    await this.getById(id);

    return this.prismaService.incident.update({
      where: { id },
      data: {
        ...incidentData,
        date: dto.date ? new Date(dto.date) : undefined,
        involvedParties: {
          deleteMany: {},
          create: involvedParties.map((party) => ({
            role: party.role,
            driverId: party.driverId,
            vehicleId: party.vehicleId,
          })),
        },
      },
      include: {
        involvedParties: {
          include: { driver: true, vehicle: true },
        },
      },
    });
  }

  async delete(id: string) {
    await this.getById(id);

    return this.prismaService.incident.delete({
      where: { id },
    });
  }
}
