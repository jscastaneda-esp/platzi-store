import { Controller, Get, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiKeyGuard } from './auth/guards/api-key.guard'
import { Public } from './auth/decorators/public.decorator'

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
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
