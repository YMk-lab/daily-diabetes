import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { UserInterface } from '@daily-diabetes/shared-data';
import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';
import { SkipAuth } from '../../../decorators/skip-auth.decorator';

@Controller('users')
export class UsersController {

  @UseGuards(JwtAuthGuard) // protected route
  @Get('profile')
  getProfile(@Req() request: any): Promise<any> {
    return request.user;
  }

  @Post('create')
  async create(@Body() user: UserInterface): Promise<any> {
    return user;
  }

  // test route without jwt validation
  @SkipAuth()
  @Get('all')
  async findAll(): Promise<any> {
    return [];
  }

}
