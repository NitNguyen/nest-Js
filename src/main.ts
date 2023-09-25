import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { AppModule } from './app.module';

const validationOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  exceptionFactory: (errors: ValidationError[]) =>
    new HttpException(
      {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: errors.reduce(
          (accumulator, currentValue) => ({
            ...accumulator,
            [currentValue.property]: Object.values(
              currentValue.constraints ?? {},
            ).join(', '),
          }),
          {},
        ),
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    ),
};

export default validationOptions;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe(validationOptions));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  await app.listen(3000);
}
bootstrap();
