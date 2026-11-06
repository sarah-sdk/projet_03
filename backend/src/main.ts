import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('ChâTop API')
    .setDescription(
      'APIRest de ChâTop permettant de mettre en relation des locataires et des propriétaires dans une zone touristique. Elle permet de gérer les utilisateurs, les locations et les échanges entre les utilisateurs',
    )
    .setVersion('1.0')
    .addTag('Auth', 'Authentification et gestion des accès')
    .addTag('Users', 'Gestion des utilisateurs')
    .addTag('Rentals', 'Gestion des locations')
    .addTag('Messages', 'Gestion des échanges entre les utilisateurs')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
