import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { environments } from './config';

async function main() {
  const logger = new Logger('Auth Microservice');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.NATS,
    options: {
      servers: environments.natsServer
    }
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )
  await app.listen();
  logger.log(`Auth-Microservice is running on ${environments.natsServer}`);
}
main();
