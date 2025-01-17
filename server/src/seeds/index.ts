import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";
import seedUsers from "./users";

const seedName: string | undefined = process.argv[2];

if (!seedName) {
  throw new Error("Please input a seed name!");
}

const bootstrap = async () => {
  const application = await NestFactory.createApplicationContext(AppModule);

  switch (seedName) {
    case "users":
      await seedUsers(application);
      break;
    default:
      throw new Error("Invalid seed name, please try again!");
  }

  await application.close();
};

bootstrap();
