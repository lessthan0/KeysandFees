import dotenv from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `${name} is missing. Add it to your .env file.\n` +
        'Required variables: DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME',
    );
  }

  return value;
}

const DB_HOST = requireEnv('DB_HOST');
const DB_PORT = Number(requireEnv('DB_PORT'));
const DB_USERNAME = requireEnv('DB_USERNAME');
const DB_PASSWORD = requireEnv('DB_PASSWORD');
const DB_NAME = requireEnv('DB_NAME');

if (Number.isNaN(DB_PORT)) {
  throw new Error('DB_PORT must be a number.');
}

export const AppDataSource = new DataSource({
  type: 'postgres',

  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,

  ssl: {
    rejectUnauthorized: false,
  },

  synchronize: true,
  logging: false,
  entities: ['dist/entities/*.js'],
});

await AppDataSource.initialize();
