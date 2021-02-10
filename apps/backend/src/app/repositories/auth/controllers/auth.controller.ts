import { Controller, Post, Req, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from '../../../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: any): Promise<any> {
    return this.authService.login(request.user);
  }

}
