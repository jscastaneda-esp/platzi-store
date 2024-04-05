import { CONFIG_KEY, Config } from '@/config'
import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Client } from 'pg'

const API_KEY = '1234r578ikj'
const API_KEY_PROD = '1234rssiu78ikj'

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory(config: Config) {
        const { host, port, user, password, name, schema } = config.database
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database: name,
          schema,
          autoLoadEntities: true,
        }
      },
      inject: [CONFIG_KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'DATABASE',
      useFactory(config: Config) {
        const { host, port, user, password, name, schema } = config.database
        const client = new Client({
          host: host,
          port: port,
          user: user,
          password: password,
          database: name,
        })
        client.connect()

        if (schema) {
          client.query(`SET search_path TO '${schema}';`)
        }

        return client
      },
      inject: [CONFIG_KEY],
    },
  ],
  exports: [TypeOrmModule, 'API_KEY', 'DATABASE'],
})
export class DatabaseModule {}
