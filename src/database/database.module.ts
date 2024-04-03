import { Global, Module } from '@nestjs/common'

const API_KEY = '1234r578ikj'
const API_KEY_PROD = '1234rssiu78ikj'

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
