import { Controller, Post, Req, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from '../../../guards/local-auth.guard';

@Controller('auth')
export class AuthController {

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: any): Promise<any> {
    return request.user;
  }

}
