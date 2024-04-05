import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('new')
  newEndpoint() {
    return 'yo soy nuevo'
  }

  @Get('/new2/')
  newEndpoint2() {
    return 'yo soy nuevo 2'
  }

  @Get('tasks')
  getTasks() {
    return this.appService.getTasks()
  }
}
