import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import "dotenv/config";

const configService = new ConfigService();

const dataSource = new DataSource({
  type: "postgres",
  url: configService.getOrThrow<string>("DATABASE_URL"),
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  migrations: ["./migrations/*{.ts,.js}"], // Path to the migration files
});

export default dataSource;
