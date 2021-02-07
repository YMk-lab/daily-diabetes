import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(environment.server.globalPrefix);
  app.enableCors({
    origin: environment.client.host,
    credentials: true
  });
  app.use(helmet());
  // app.use(rateLimit({
  //   rateLimit: {
  //     windowMs: 15 * 60 * 1000,
  //     max: 100
  //   }
  // }));

  const port = process.env.PORT || environment.server.port;

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + environment.server.globalPrefix);
  });
}

bootstrap();
