import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { AuthTokensInterface } from '@daily-diabetes/shared-data';

import { LocalAuthGuard } from '../../../guards/local-auth.guard';
import { AuthService } from '../service/auth.service';
import { SkipAuth } from '../../../decorators/skip-auth.decorator';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: any): Promise<AuthTokensInterface | any> {
    return this.authService.login(request.user, request.headers['user-agent']);
  }

  @SkipAuth()
  @Post('token')
  async refreshToken(@Body('refreshToken') refreshToken: string): Promise<AuthTokensInterface | any> {
    return this.authService.refreshToken(refreshToken);
  }

}
