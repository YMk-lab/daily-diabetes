import { Controller, Post, Req, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from './auth.service';
import { SkipAuth } from '../decorators/skip-auth.decorator';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request): Promise<any> {
    return this.authService.login(request.user);
  }

}
