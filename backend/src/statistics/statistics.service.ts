import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatisticsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMainStatistics() {
    const [
      totalIncidents,
      totalDrivers,
      totalVehicles,
      severityCounts,
      topDrivers,
    ] = await Promise.all([
      this.prismaService.incident.count(),
      this.prismaService.driver.count(),
      this.prismaService.vehicle.count(),

      this.prismaService.incident.groupBy({
        by: ['severity'],
        _count: { id: true },
      }),

      this.prismaService.involvedParty.groupBy({
        by: ['driverId'],
        _count: { incidentId: true },
        orderBy: { _count: { incidentId: 'desc' } },
        having: {
          incidentId: {
            _count: {
              gt: 0,
            },
          },
        },
        take: 5,
      }),
    ]);

    const topDriversWithNames = await Promise.all(
      topDrivers.map(async (item) => {
        const driver = await this.prismaService.driver.findUnique({
          where: { id: item.driverId as string },
          select: { fullName: true },
        });
        return {
          name: driver?.fullName || 'Неизвестно',
          count: item._count.incidentId,
        };
      }),
    );

    return {
      counters: {
        incidents: totalIncidents,
        drivers: totalDrivers,
        vehicles: totalVehicles,
      },
      severityPie: severityCounts.map((item) => ({
        type: item.severity,
        value: item._count.id,
      })),
      topOffenders: topDriversWithNames,
    };
  }
}
