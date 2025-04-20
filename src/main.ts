// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
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
