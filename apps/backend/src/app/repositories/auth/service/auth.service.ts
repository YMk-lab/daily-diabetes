import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { AuthTokensInterface } from '@daily-diabetes/shared-data';

import { UsersService } from '../../users/services/users.service';
import { ENV_VARS } from '../../../config/variables';

@Injectable()
export class AuthService {

  // get db refresh tokens
  refreshTokens: string[] = [];

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  async validateUser(email: string): Promise<any> {
    return this.usersService.findOneToValidate(email);
  }

  async login(user: any): Promise<AuthTokensInterface> {

    const payload = { id: user.uuid, sub: user.uuid };
    const generatedRefreshToken = this.generateRefreshToken(payload);

    // store created token in DB
    this.refreshTokens.push(generatedRefreshToken);

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: generatedRefreshToken
    }

  }

  async refreshToken(token: string): Promise<AuthTokensInterface> {

    if (!token) {
      throw new UnauthorizedException();
    }

    if (!this.refreshTokens.includes(token)) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Refresh token is not valid'
      }, HttpStatus.FORBIDDEN);
    }

    try {
      const signedToken = this.jwtService.verify(token, {
        secret: this.configService.get<string>(ENV_VARS.REFRESH_TOKEN)
      });

      return {
        accessToken: this.jwtService.sign({ id: signedToken.uuid, sub: signedToken.uuid })
      }
    } catch (error) {
      throw new UnauthorizedException();
    }

  }

  private generateRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>(ENV_VARS.REFRESH_TOKEN),
      expiresIn: this.configService.get<string>(ENV_VARS.REFRESH_TOKEN_EXPIRES)
    });
  }
}
