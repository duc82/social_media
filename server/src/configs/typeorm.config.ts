import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import "dotenv/config";

const configService = new ConfigService();

const dataSource = new DataSource({
  type: "postgres",
  url: configService.getOrThrow<string>("DATABASE_URL"),
  entities: ["src/**/*.entity{.ts,.js}"],
  migrations: ["./migrations/1721043515428-third.ts"], // Path to the migration files
  logging: true,
});

export default dataSource;