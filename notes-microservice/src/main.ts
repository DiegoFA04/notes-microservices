import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { environmnets } from './config/environments';

async function main() {
  const logger = new Logger('Notes-Microservice');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.NATS,
    options: {
      servers: environmnets.natsServer
    }
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }))
  await app.listen();
  logger.log(`Notes microservice listen on ${environmnets.natsServer}`);
}
main();
