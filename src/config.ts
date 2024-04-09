import { ConfigType, registerAs } from '@nestjs/config'
import * as Joi from 'joi'

export const schema = Joi.object({
  API_KEY: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_NAME: Joi.string().required(),
  MONGO_URI: Joi.string().required(),
  MONGO_DB: Joi.string().required(),
})

export const config = registerAs('config', () => ({
  database: {
    port: parseInt(process.env.DATABASE_PORT, 10),
    name: process.env.DATABASE_NAME,
  },
  mongo: {
    uri: process.env.MONGO_URI,
    db: process.env.MONGO_DB,
  },
  apiKey: process.env.API_KEY,
}))

export type Config = ConfigType<typeof config>
export const CONFIG_KEY = config.KEY
