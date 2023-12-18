import { DataSource } from "typeorm";

// ENVIRONMENT VARIABLES
require('dotenv').config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.LABORATORY_DB_HOST,
  port: Number(process.env.LABORATORY_DB_PORT),
  username: process.env.LABORATORY_DB_USERNAME,
  password: process.env.LABORATORY_DB_PASSWORD,
  database: process.env.LABORATORY_DB_DATABASE,
  entities: ['api/src/**/*.entity.ts'],
  synchronize: false,
  logging: false,
  migrations: ['./api/src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
})