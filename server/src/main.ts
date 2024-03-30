import { HttpAdapterHost, NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
  BadRequestException,
  ClassSerializerInterceptor,
  ValidationPipe,
} from "@nestjs/common";
import { AllExceptionsFilter } from "./all-exceptions/all-exceptions.filter";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigin = [
    process.env.CLIENT_ORIGIN,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ];

  app.enableCors({
    origin: allowedOrigin,
    credentials: true,
  });
  app.use(cookieParser());

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const firstError = Object.values(errors[0].constraints)[0];
        return new BadRequestException(firstError);
      },
      stopAtFirstError: true,
      // transfrom the payload to the DTO object
      transform: true,
    }),
  );

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(process.env.PORT);
}
bootstrap();
