import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import fs from "fs";
import "dotenv/config";

const configService = new ConfigService();

const migrationsFolder = process.cwd() + "/migrations";

const files = fs.readdirSync(migrationsFolder);

const lastMigration = files[files.length - 1];

const dataSource = new DataSource({
  type: "postgres",
  url: configService.getOrThrow<string>("DATABASE_URL"),
  entities: ["src/**/*.entity{.ts,.js}"],
  migrations: [`./migrations/${lastMigration}`], // Path to the migration files
  logging: true,
});

export default dataSource;
