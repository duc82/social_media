import fs from "fs";
import { HttpAdapterHost, NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
  BadRequestException,
  ClassSerializerInterceptor,
  ValidationPipe,
} from "@nestjs/common";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";

async function bootstrap() {
  const arg = process.argv[2];

  const app = await NestFactory.create(AppModule, {
    httpsOptions: arg === "https" && {
      key: fs.readFileSync("./src/secrets/key.pem"),
      cert: fs.readFileSync("./src/secrets/cert.pem"),
      rejectUnauthorized: false,
    },
  });

  const allowedOrigin = [
    process.env.CLIENT_URL,
    process.env.ADMIN_URL,
    "http://127.0.0.1:3000",
  ];

  app.enableCors({
    origin: process.env.NODE_ENV === "production" ? allowedOrigin : "*",
    credentials: true,
  });

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalPipes(
    // validate the DTO object
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
