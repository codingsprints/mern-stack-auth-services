import { DataSource } from 'typeorm';
import { configENV } from '../config/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configENV.dbHost,
  port: Number(configENV.dbPort),
  username: configENV.dbUsername,
  password: configENV.dbPassword,
  database: configENV.dbDatabase,
  synchronize: true,
  logging: false,
  entities: ['dist/src/database/entities/*.{ts,js}'],
  migrations: ['dist/src/database/migrations/*.{ts,js}'],
  ssl: {
    // ca: configENV.rdsSSL.replace(/\\n/g, '\n'),
    ca: configENV.rdsSSL,
    rejectUnauthorized: false,
  },
});
