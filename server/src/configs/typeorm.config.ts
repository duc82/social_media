import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import fs from "fs";
import "dotenv/config";

const configService = new ConfigService();

const migrationsFolder = process.cwd() + "/migrations";

const files = fs.readdirSync(migrationsFolder);

const migrations = files.map((file) => `./migrations/${file}`);

const dataSource = new DataSource({
  type: "postgres",
  url: configService.getOrThrow<string>("DATABASE_URL"),
  entities: ["src/**/*.entity{.ts,.js}"],
  migrations, // Path to the migration files
  logging: true,
});

export default dataSource;
