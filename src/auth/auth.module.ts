import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './services/auth.service'
import { UsersModule } from '@/users/users.module'
import { LocalStrategy } from './strategies/local.strategy'
import { AuthController } from './controllers/auth.controller'
import { CONFIG_KEY, Config } from '@/config'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory(config: Config) {
        return {
          secret: config.jwtSecret,
          signOptions: {
            expiresIn: '1h',
          },
        }
      },
      inject: [CONFIG_KEY],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
