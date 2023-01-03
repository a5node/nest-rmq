import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';

import { ApiModule } from './api.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);

  const port = process.env['PORT'] || 3002;

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  await app.listen(port, async () => {
    Logger.log(`Application is running on: ${await app.getUrl()}`);
  });
}

bootstrap();
