import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { CustomLogger } from './shared/services/custom-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger(),
  });
  app.use(compression())

  const options = new DocumentBuilder()
    .setTitle('Petshop API')
    .setDescription('API do curso Criando APIs com Nest Framework - balta.io')
    .setVersion('1.0.0')
    .addSecurity('basic', {
      type: 'http',
      scheme: 'basic',
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Petshop API'
  };
  SwaggerModule.setup('swagger', app, document, customOptions);

  await app.listen(3000);
}
bootstrap();
