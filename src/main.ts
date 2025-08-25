import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductAlreadyExistFilter } from './product/filter/product-already-exist.filter';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { ProductNotFoundErrorFilter } from './product/filter/product-not-found.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ProductAlreadyExistFilter());
  app.useGlobalFilters(new ProductNotFoundErrorFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
