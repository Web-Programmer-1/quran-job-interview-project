import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './global/global.err';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Global API prefix
  app.setGlobalPrefix('api/v1');

  // ✅ Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // ✅ Global error handler
  app.useGlobalFilters(new GlobalExceptionFilter());

  // ✅ CORS
  app.enableCors({
    origin: '*', // production এ FRONTEND_URL use করবে
    credentials: true,
  });

  const PORT = process.env.PORT || 3000;

  await app.listen(PORT);

  console.log(`🚀 Server running on http://localhost:${PORT}/api/v1`);
}

bootstrap();