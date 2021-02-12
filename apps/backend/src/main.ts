import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

import { AppModule } from './app/app.module';
import configuration from './app/config/configuration';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(configuration().globalPrefix);
  app.enableCors({
    origin: configuration().client.host,
    credentials: true
  });
  app.use(helmet());
  // app.use(rateLimit({
  //   rateLimit: {
  //     windowMs: 15 * 60 * 1000,
  //     max: 100
  //   }
  // }));

  await app.listen(configuration().port, () => {
    Logger.log('Listening at http://localhost:' + configuration().port + '/' + configuration().globalPrefix);
  });
}

bootstrap();
