import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv'
import { environments } from '../environments'

dotenv.config({
  path: environments[process.env.NODE_ENV] || environments.dev,
})

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DATABASE_SCHEMA,
} = process.env

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DATABASE_HOST,
  port: parseInt(DATABASE_PORT),
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  schema: DATABASE_SCHEMA,
  synchronize: false,
  logging: true,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'schema-migrations',
})
