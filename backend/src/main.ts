import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });

  await app.listen(process.env.SERVER_PORT ?? 5000);
}
bootstrap();
