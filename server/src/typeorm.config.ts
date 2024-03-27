import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { config } from "dotenv";

config();

const configService = new ConfigService();

const dataSource = new DataSource({
  type: "postgres",
  url: configService.getOrThrow<string>("DATABASE_URL"),
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  migrations: ["migrations/*{.ts,.js}"],
  logging: configService.get<string | undefined>("NODE_ENV") !== "production",
});

export default dataSource;
