import { CanActivate, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'

// eslint-disable-next-line @typescript-eslint/ban-types
export const JwtGuard = (...additional: (CanActivate | Function)[]) =>
  UseGuards(JwtAuthGuard, ...additional)
