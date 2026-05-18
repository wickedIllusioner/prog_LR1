import {
  PrismaClient,
  EnumIncidentSeverity,
  EnumPartyRole,
  Role,
} from '@prisma/client';
import type { Driver, Vehicle, Incident } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool as any);

const prisma = new PrismaClient({ adapter });

const firstNames = [
  'Алексей',
  'Дмитрий',
  'Иван',
  'Максим',
  'Сергей',
  'Александр',
  'Андрей',
  'Владимир',
  'Михаил',
  'Николай',
  'Роман',
  'Евгений',
  'Олег',
  'Павел',
];
const lastNames = [
  'Иванов',
  'Смирнов',
  'Кузнецов',
  'Попов',
  'Соколов',
  'Лебедев',
  'Козлов',
  'Новиков',
  'Морозов',
  'Петров',
  'Волков',
  'Зайцев',
  'Павлов',
];
const patronymics = [
  'Иванович',
  'Александрович',
  'Сергеевич',
  'Дмитриевич',
  'Алексеевич',
  'Максимович',
  'Андреевич',
  'Владимирович',
  'Николаевич',
  'Михайлович',
];

const carBrands = [
  {
    mark: 'Toyota',
    models: [
      'Camry',
      'Corolla',
      'RAV4',
      'Land Cruiser',
      'Hilux',
      'Yaris',
      'Avensis',
      'Highlander',
    ],
  },
  {
    mark: 'Lada',
    models: [
      'Vesta',
      'Granta',
      'Niva',
      'Largus',
      'XRAY',
      'Priora',
      'Kalina',
      '2107',
    ],
  },
  {
    mark: 'Kia',
    models: [
      'Rio',
      'Sportage',
      'K5',
      'Sorento',
      'Cerato',
      'Optima',
      'Ceed',
      'Stinger',
    ],
  },
  {
    mark: 'Hyundai',
    models: [
      'Solaris',
      'Creta',
      'Tucson',
      'Santa Fe',
      'Elantra',
      'Sonata',
      'i30',
      'Palisade',
    ],
  },
  {
    mark: 'BMW',
    models: ['X5', '3 Series', '5 Series', 'X3', 'X7', 'X1', '7 Series', 'M3'],
  },
  {
    mark: 'Mercedes-Benz',
    models: [
      'E-Class',
      'C-Class',
      'GLC',
      'GLE',
      'S-Class',
      'GLA',
      'A-Class',
      'G-Class',
    ],
  },
  {
    mark: 'Skoda',
    models: ['Octavia', 'Rapid', 'Kodiaq', 'Superb', 'Karoq', 'Fabia', 'Kamiq'],
  },
  {
    mark: 'Volkswagen',
    models: ['Polo', 'Passat', 'Tiguan', 'Tuareg', 'Jetta', 'Golf', 'Multivan'],
  },
  {
    mark: 'Nissan',
    models: [
      'Qashqai',
      'X-Trail',
      'Almera',
      'Teana',
      'Juke',
      'Murano',
      'Pathfinder',
    ],
  },
  {
    mark: 'Renault',
    models: [
      'Logan',
      'Sandero',
      'Duster',
      'Kaptur',
      'Megane',
      'Fluence',
      'Arkana',
    ],
  },
  {
    mark: 'Ford',
    models: ['Focus', 'Mondeo', 'Kuga', 'Explorer', 'Fusion', 'Fiesta'],
  },
];

const streets = [
  'Тверская',
  'Арбат',
  'Пятницкая',
  'Мясницкая',
  'Покровка',
  'Маросейка',
  'Большая Дмитровка',
  'Малая Дмитровка',
  'Никольская',
  'Варварка',
  'Ильинка',
  'Рождественка',
  'Сретенка',
  'Лубянка',
  'Кузнецкий Мост',
  'Неглинная',
  'Петровка',
  'Каретный Ряд',
  'Цветной бульвар',
  'Чистопрудный бульвар',
  'Покровский бульвар',
  'Яузский бульвар',
  'Страстной бульвар',
  'Новинский бульвар',
  'Тверской бульвар',
  'Никитский бульвар',
  'Гоголевский бульвар',
  'Остоженка',
  'Пречистенка',
  'Волхонка',
  'Знаменка',
  'Воздвиженка',
  'Новый Арбат',
  'Кутузовский проспект',
  'Ленинградский проспект',
  'Комсомольский проспект',
  'Вернадского проспект',
  'Рязанский проспект',
  'Волгоградский проспект',
  'Ленинский проспект',
  'Мичуринский проспект',
  'Проспект Мира',
  'Щёлковское шоссе',
  'Энтузиастов шоссе',
  'Варшавское шоссе',
  'Каширское шоссе',
  'Дмитровское шоссе',
  'Алтуфьевское шоссе',
  'Ярославское шоссе',
  'Рублёвское шоссе',
  'Можайское шоссе',
  'Киевское шоссе',
  'Пятницкое шоссе',
  'Симферопольское шоссе',
  'Академика Сахарова',
  'Большая Ордынка',
  'Малая Ордынка',
  'Большая Полянка',
  'Малая Полянка',
  'Полянка',
  'Якиманка',
  'Крымский Вал',
  'Зубовский бульвар',
];
// const realMoscowAddresses = [
//   'г. Москва, ул. Тверская, д. 7',
//   'г. Москва, Новый Арбат, д. 21',
//   'г. Москва, Кутузовский проспект, д. 2',
//   'г. Москва, Ленинградский проспект, д. 31',
//   'г. Москва, ул. Петровка, д. 38',
//   'г. Москва, ул. Охотный Ряд, д. 2',
//   'г. Москва, проспект Мира, д. 119',
//   'г. Москва, ул. Арбат, д. 54',
// ];
const incidentDescriptions = [
  'Несоблюдение безопасной дистанции при торможении.',
  'Столкновение на перекрестке из-за проезда на запрещающий сигнал светофора.',
  'Наезд на препятствие при движении задним ходом на парковке.',
  'Боковое касание при перестроении в соседнюю полосу.',
  'Не уступил дорогу при выезде с прилегающей территории.',
  'Незначительное повреждение заднего бампера в пробке.',
  'Съезд в кювет в условиях плохой видимости из-за тумана.',
  'Потеря управления на обледенелом участке дороги.',
  'Превышение скорости, повлекшее занос автомобиля.',
  'Задел припаркованный автомобиль во дворе.',
  'Наезд на пешехода на нерегулируемом переходе.',
  'ДТП при обгоне с выездом на встречную полосу.',
  'Столкновение при повороте налево без уступания дороги.',
  'Наезд на стоящее транспортное средство.',
  'Падение груза из кузова автомобиля.',
  'ДТП при движении задним ходом на парковке ТЦ.',
  'Столкновение с отбойником на трассе.',
  'Повреждение автомобиля упавшим деревом.',
  'Наезд на яму/выбоину с повреждением подвески.',
  'Лобовое столкновение при выезде на встречную полосу.',
  'ДТП при обгоне трамвая.',
  'Столкновение на кольцевом перекрестке.',
];

const allowedPlateLetters = [
  'А',
  'В',
  'Е',
  'К',
  'М',
  'Н',
  'О',
  'Р',
  'С',
  'Т',
  'У',
  'Х',
];
const regions = [
  '77',
  '97',
  '99',
  '177',
  '197',
  '199',
  '777',
  '50',
  '90',
  '150',
  '190',
  '750',
  '790',
  '250',
  '550',
];

// --- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

async function main() {
  await prisma.involvedParty.deleteMany();
  await prisma.vehicleAssignment.deleteMany();
  await prisma.incident.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.driver.deleteMany();

  const drivers: Driver[] = [];
  const vehicles: Vehicle[] = [];
  const incidents: Incident[] = [];

  // Создание тестовых пользователей с ролями
  const hashedAdminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@test.ru' },
    update: {
      password: hashedAdminPassword,
      role: Role.ADMIN,
    },
    create: {
      email: 'admin@test.ru',
      password: hashedAdminPassword,
      role: Role.ADMIN,
    },
  });

  const hashedUserPassword = await bcrypt.hash('user123', 10);
  await prisma.user.upsert({
    where: { email: 'user@test.ru' },
    update: {
      password: hashedUserPassword,
      role: Role.USER,
    },
    create: {
      email: 'user@test.ru',
      password: hashedUserPassword,
      role: Role.USER,
    },
  });

  console.log('Создан администратор (admin@test.ru / admin123)');
  console.log('Создан пользователь (user@test.ru / user123)');

  // 1. Создание 20 Водителей
  for (let i = 1; i <= 20; i++) {
    const lastName = getRandomItem(lastNames);
    const firstName = getRandomItem(firstNames);
    const patronymic = getRandomItem(patronymics);

    const driver = await prisma.driver.create({
      data: {
        fullName: `${lastName} ${firstName} ${patronymic}`,
        licenseNumber: `77 ${getRandomInt(10, 99)} ${(100000 + i).toString()}`,
        phone: `+7 (${getRandomInt(900, 999)}) ${getRandomInt(100, 999)}-${getRandomInt(10, 99)}-${i.toString().padStart(2, '0')}`,
      },
    });
    drivers.push(driver);
  }
  console.log('Создано 20 уникальных водителей');

  // 2. Создание 20 Транспортных средств
  for (let i = 1; i <= 20; i++) {
    const brand = getRandomItem(carBrands);
    const model = getRandomItem(brand.models);

    const plateLetter1 = getRandomItem(allowedPlateLetters);
    const plateLetter2 = getRandomItem(allowedPlateLetters);
    const plateLetter3 = getRandomItem(allowedPlateLetters);
    const plateNumber = i.toString().padStart(3, '0');
    const region = getRandomItem(['77', '99', '199', '777', '50', '150']);

    const vehicle = await prisma.vehicle.create({
      data: {
        vin: `${generateRandomString(14)}${i.toString().padStart(3, '0')}`,
        licensePlate: `${plateLetter1}${plateNumber}${plateLetter2}${plateLetter3}${region}`,
        mark: brand.mark,
        model: model,
        year: getRandomInt(2005, 2024),
      },
    });
    vehicles.push(vehicle);
  }
  console.log('Создано 20 разнообразных автомобилей');

  // 3. Связь Водителей и Транспорт (VehicleAssignment)
  for (let i = 0; i < 20; i++) {
    await prisma.vehicleAssignment.create({
      data: {
        driverId: drivers[i].id,
        vehicleId: vehicles[i].id,
      },
    });
  }

  for (let i = 0; i < 5; i++) {
    const driverIdx = getRandomInt(0, drivers.length - 1);
    const vehicleIdx = getRandomInt(0, vehicles.length - 1);
    const existing = await prisma.vehicleAssignment.findFirst({
      where: {
        driverId: drivers[driverIdx].id,
        vehicleId: vehicles[vehicleIdx].id,
      },
    });
    if (!existing && driverIdx !== vehicleIdx % drivers.length) {
      await prisma.vehicleAssignment.create({
        data: {
          driverId: drivers[driverIdx].id,
          vehicleId: vehicles[vehicleIdx].id,
        },
      });
    }
  }
  console.log('Водители привязаны к транспорту');

  // 4. Создание 20 Инцидентов
  const severities = [
    EnumIncidentSeverity.LOW,
    EnumIncidentSeverity.MEDIUM,
    EnumIncidentSeverity.HIGH,
    EnumIncidentSeverity.CRITICAL,
  ];

  for (let i = 0; i < 20; i++) {
    const severity = getRandomItem(severities);
    const street = getRandomItem(streets);
    const houseNumber = getRandomInt(1, 150);
    const dateOffsetDays = getRandomInt(0, 365);

    const incident = await prisma.incident.create({
      data: {
        date: new Date(
          new Date().getTime() - dateOffsetDays * 24 * 60 * 60 * 1000,
        ),
        location: `г. Москва, ул. ${street}, д. ${houseNumber}`,
        description: getRandomItem(incidentDescriptions),
        severity: severity,
      },
    });
    incidents.push(incident);

    // 5. Назначение участников (InvolvedParty)
    await prisma.involvedParty.create({
      data: {
        role: EnumPartyRole.CULPRIT,
        driverId: drivers[i].id,
        vehicleId: vehicles[i].id,
        incidentId: incident.id,
      },
    });

    // Cлучайный пострадавший
    let victimIndex = getRandomInt(0, 19);
    while (victimIndex === i) {
      victimIndex = getRandomInt(0, 19);
    }

    await prisma.involvedParty.create({
      data: {
        role: EnumPartyRole.VICTIM,
        driverId: drivers[victimIndex].id,
        vehicleId: vehicles[victimIndex].id,
        incidentId: incident.id,
      },
    });
  }
  console.log('Создано 20 реалистичных инцидентов с участниками');
  console.log('Сидирование успешно завершено');
}

main()
  .catch((e) => {
    console.error('Ошибка при сидировании:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
