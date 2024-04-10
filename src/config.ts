import { ConfigType, registerAs } from '@nestjs/config'
import * as Joi from 'joi'

export const schema = Joi.object({
  API_KEY: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_SCHEMA: Joi.string().optional(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
})

export const config = registerAs('config', () => ({
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    name: process.env.DATABASE_NAME,
    schema: process.env.DATABASE_SCHEMA,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
}))

export type Config = ConfigType<typeof config>
export const CONFIG_KEY = config.KEY
