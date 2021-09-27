declare const module: any;

import { BadRequestException, Logger, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app.module';
import * as Sentry from '@sentry/node';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.SENTRY_ENVIRONMENT
  });
  Sentry.configureScope(scope => {
    scope.setTag("service", 'momos-media-scrapper')
  });
  app.enableCors({
    origin: "*",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
  });
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
      if (validationErrors[0].children.length) return new BadRequestException(Object.values(validationErrors[0].children[0].constraints)[0]);
      else return new BadRequestException(Object.values(validationErrors[0].constraints)[0]);
    }
  }
  ));


  let port = process.env.PORT
  await app.listen(port);
  Logger.log(`Listening to ${port}`)
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
