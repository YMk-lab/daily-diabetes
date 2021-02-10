import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { environment } from '../../environments/environment';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${ environment.server.jwt.access.secretKey }`
    });
  }

  async validate(payload: any) {
    console.log(payload);
    return { id: payload.sub, email: payload.email };
  }
}
