import { Logger } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionsFilter } from './common/filters/global-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new GlobalExceptionsFilter(httpAdapter));
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.APP_PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
