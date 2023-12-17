import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { AllExceptionsFilter } from "./all-exceptions/all-exceptions.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const firstError = Object.values(errors[0].constraints)[0];
        return new BadRequestException(firstError);
      },
    }),
  );

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
