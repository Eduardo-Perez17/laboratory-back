// CONFIG TYPEORM AND NEST
import { join } from 'path';
import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// ENVIRONMENT VARIABLES
require('dotenv').config();

export const DataSourceConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.LABORATORY_DB_HOST,
  port: Number(process.env.LABORATORY_DB_PORT),
  username: process.env.LABORATORY_DB_USERNAME,
  password: process.env.LABORATORY_DB_PASSWORD,
  database: process.env.LABORATORY_DB_DATABASE,
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  synchronize: false,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};
