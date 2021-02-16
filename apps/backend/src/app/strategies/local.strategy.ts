import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { compare } from 'bcrypt';

import { AuthService } from '../repositories/auth/service/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private authService: AuthService) {
    super({ usernameField: 'emailOrPhone' });
  }

  async validate(emailOrPhone: string, password: string) {

    const user = await this.authService.validateUser(emailOrPhone);

    if (!user) {
      throw new UnauthorizedException();
    }

    const arePasswordsMatch = await compare(password, user.password);

    if (!arePasswordsMatch) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Wrong email or password. Please try again'
      }, HttpStatus.BAD_REQUEST);
    }

    return user;
  }

}
