import { Module } from '@nestjs/common'
import { HttpModule, HttpService } from '@nestjs/axios'
import { ConfigModule } from '@nestjs/config'
import { lastValueFrom } from 'rxjs'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { ProductsModule } from './products/products.module'
import { DatabaseModule } from './database/database.module'
import { environments } from './environments'
import { schema, config } from './config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: environments[process.env.NODE_ENV] || environments.dev,
      validationSchema: schema,
      load: [config],
    }),
    HttpModule,
    UsersModule,
    ProductsModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      async useFactory(httpService: HttpService) {
        const request = httpService.get(
          'https://jsonplaceholder.typicode.com/todos',
        )
        const response = await lastValueFrom(request)
        return response.data
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
