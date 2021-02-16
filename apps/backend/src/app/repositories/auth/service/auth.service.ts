import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthTokensInterface, UserInterface } from '@daily-diabetes/shared-data';

import { UsersService } from '../../users/services/users.service';
import { UserDocument } from '../../users/schemas/user.schema';
import { TokensService } from '../../tokens/services/tokens.service';
import { AuthPayloadInterface } from '../interfaces/auth-payload.interface';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private tokensService: TokensService
  ) { }

  async validateUser(emailOrPhone: string): Promise<UserDocument | any> {
    return this.usersService.findOneToValidate(emailOrPhone);
  }

  async login(user: UserInterface, fingerPrint: string): Promise<AuthTokensInterface | any> {

    const payload: AuthPayloadInterface = { email: user.email, role: user.role, id: user.uuid };
    const accessToken = this.tokensService.signAccessToken(payload);
    const refreshToken = await this.tokensService.createToken({ user, fingerPrint, payload });

    return {
      accessToken,
      refreshToken: refreshToken.refreshToken
    }

  }

  async refreshToken(token: string): Promise<AuthTokensInterface | any> {

    if (!token) {
      throw new UnauthorizedException();
    }

    const userRefreshToken = await this.tokensService.findByToken(token);

    if (!userRefreshToken) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Refresh token is not set'
      }, HttpStatus.FORBIDDEN);
    }

    try {
     const { email, role, id } = this.tokensService.verifyToken(userRefreshToken.refreshToken);
     const payload = { email, role, id };

       return {
         accessToken: this.tokensService.signAccessToken(payload)
       }

    } catch (error) {
      const isRefreshTokenRevoked = await this.tokensService.revoke(userRefreshToken.refreshToken);

      if (error && isRefreshTokenRevoked) {
        throw new UnauthorizedException();
      }
    }

  }
}
