import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
  const schema = {
    production: 'https',
    staging: 'https',
    development: 'http',
  };
  const options = new DocumentBuilder()
    .setTitle('API')
    .setVersion('0.0.1')
    .addBearerAuth()
    // .setSchemes(schema[env])
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
}
