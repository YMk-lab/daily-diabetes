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
      refreshTokenID: refreshToken._id
    }

  }

  async refreshToken(refreshTokenID: string): Promise<AuthTokensInterface | any> {

    if (!refreshTokenID) {
      throw new UnauthorizedException();
    }

    const userRefreshToken = await this.tokensService.findByID(refreshTokenID);

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

  async logout(refreshTokenID): Promise<boolean> {

    if (!refreshTokenID) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Refresh token is not provided'
      }, HttpStatus.BAD_REQUEST)
    }

    const removedToken = await this.tokensService.removeSession(refreshTokenID);

    if (removedToken) {
      return true;
    }
  }
}
