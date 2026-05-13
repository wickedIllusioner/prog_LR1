import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'ts-node ./prisma/seed.ts',
  },
  datasource: {
    url:
      process.env.DATABASE_URL ||
      'postgresql://postgres:postgres@db:5432/auto-incident?schema=public',
  },
});
