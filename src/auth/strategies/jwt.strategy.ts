import { PassportStrategy } from '@nestjs/passport'
import { Inject, Injectable } from '@nestjs/common'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { CONFIG_KEY, Config } from '@/config'
import { PayloadToken } from '../models/token.model'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(CONFIG_KEY) config: Config) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwtSecret,
    })
  }

  validate(payload: PayloadToken) {
    return payload
  }
}
