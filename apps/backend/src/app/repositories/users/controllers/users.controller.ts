import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';

import { UserInterface } from '@daily-diabetes/shared-data';

import { UsersService } from '../services/users.service';
import { SkipAuth } from '../../../decorators/skip-auth.decorator';
import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';
import { UserDocument } from '../schemas/user.schema';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) { }

  @SkipAuth()
  @Post('create')
  async create(@Body('user') user: UserInterface): Promise<UserDocument | any> {
    return this.usersService.createUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() request: any): Promise<UserDocument | any> {
    return this.usersService.getMe(request.user.id);
  }
}
