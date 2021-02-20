import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { compare } from 'bcrypt';

import { AuthService } from '../repositories/auth/service/auth.service';
import { errorTranslationKeys } from '../config/errors-translations-keys';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {

    const user = await this.authService.validateUser(email);

    if (!user) {
      throw new HttpException({
        title: errorTranslationKeys.LOGIN_TITLE,
        error: errorTranslationKeys.LOGIN_TEXT
      }, HttpStatus.FORBIDDEN);
    }

    const arePasswordsMatch = await compare(password, user.password);

    if (!arePasswordsMatch) {
      throw new HttpException({
        title: errorTranslationKeys.LOGIN_TITLE,
        error: errorTranslationKeys.LOGIN_TEXT
      }, HttpStatus.BAD_REQUEST);
    }

    return user;
  }

}
