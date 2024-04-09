import { CONFIG_KEY, Config } from '@/config'
import { Global, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MongoClient } from 'mongodb'

const API_KEY = '1234r578ikj'
const API_KEY_PROD = '1234rssiu78ikj'

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory(config: Config) {
        const { uri, db } = config.mongo
        return {
          uri,
          dbName: db,
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
      provide: 'DB_CLIENT',
      async useFactory(config: Config) {
        const { uri, db } = config.mongo
        const client = new MongoClient(uri)
        const conn = await client.connect()
        return conn.db(db)
      },
      inject: [CONFIG_KEY],
    },
  ],
  exports: ['API_KEY', 'DB_CLIENT', MongooseModule],
})
export class DatabaseModule {}
