// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
<<<<<<< HEAD
import {
  BadRequestException,
  INestApplication,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

const logger = new Logger('Bootstrap');

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Feedback API')
    .setDescription('API for managing client feedback')
    .setVersion('1.0')
    .addTag('feedback')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  app.enableCors();

=======
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
>>>>>>> 302dbb7 (feat: simple feedback crud implement)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
<<<<<<< HEAD
=======
      // 👇 Important to include this
>>>>>>> 302dbb7 (feat: simple feedback crud implement)
      exceptionFactory: (errors) => {
        return new BadRequestException(
          errors.map((err) => ({
            field: err.property,
            errors: Object.values(err.constraints || {}),
          })),
        );
      },
    }),
  );
<<<<<<< HEAD
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  setupSwagger(app);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  logger.log(`🚀 Server is running on http://localhost:${PORT}`);
}

bootstrap().catch((error) => {
  console.error('Error starting the server:', error);
});
=======

  const config = new DocumentBuilder()
    .setTitle('Feedback API')
    .setDescription('API for managing client feedback')
    .setVersion('1.0')
    .addTag('feedback')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap()
  .then(() => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  })
  .catch((error) => {
    console.error('Error starting the server:', error);
  });
>>>>>>> 302dbb7 (feat: simple feedback crud implement)
