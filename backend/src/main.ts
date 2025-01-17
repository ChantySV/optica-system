import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN').split(','),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: configService.get<boolean>('CORS_CREDENTIALS'),
  });
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform:true,
    })
  ); 

  await app.listen(process.env.PORT);
}
bootstrap();
