// CONFIG NESTJS AND TYPEORM
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

// LIBRERIES
import * as morgan from 'morgan';

// CONSTANTS
import { CORS } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);

  // create instance for nest application
  const configService = app.get(ConfigService);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  // HTTP request level middleware. Tool that records requests along with other information
  app.use(morgan('dev'));

  // VALIDATION DTO'S
  app.useGlobalPipes(new ValidationPipe());

  // enabling our enable cors configuration
  app.enableCors(CORS);

  // change url name on API
  app.setGlobalPrefix(configService.get('ROOT_APLICATION'));

  // listening to the application
  await app.listen(process.env.PORT_APLICATION);
  console.log(
    `Aplication running on: http://localhost:${configService.get(
      'PORT_APLICATION',
    )}/${configService.get('ROOT_APLICATION')}`,
  );
}
bootstrap();
