import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { ENV_VARS } from '../config/variables';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>(ENV_VARS.ACCESS_TOKEN),
      ignoreExpiration: false
    });
  }

  async validate(payload: any) {
    return payload;
  }

}
