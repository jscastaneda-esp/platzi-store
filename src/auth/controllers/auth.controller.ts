import { Controller, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { AuthService } from '../services/auth.service'
import { User } from '@/users/entities/user.entity'
import { LocalAuthGuard } from '../guards/local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request) {
    return this.authService.login(req.user as User)
  }
}
