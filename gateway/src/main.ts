import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { environmentVariables } from './config';
import { GlobalRpcExceptionFilter } from './common/exceptions/rpc-exception.filter';

async function main() {
  const logger = new Logger("Gateway");
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new GlobalRpcExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }))
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Application is running on: ${environmentVariables.port}`);
}
main();
