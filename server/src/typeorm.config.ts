import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import "dotenv/config";

const configService = new ConfigService();

const dataSource = new DataSource({
  type: "postgres",
  url: configService.getOrThrow<string>("DATABASE_URL"),
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  migrations: ["./migrations/*.ts"], // Path to the migration files
});

export default dataSource;
