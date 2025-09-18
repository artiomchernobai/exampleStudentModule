import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppDataSource } from './data-source';

async function bootstrap() {
  AppDataSource.initialize()
    .then(() => (console.log('Data Source has been initialized!')))
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
    });

  const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
  .setTitle('My API')
  .setDescription('API description')
  .setVersion('1.0')
  .addTag('api')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
