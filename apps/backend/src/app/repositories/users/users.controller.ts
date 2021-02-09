import { Controller, Get, Req, Post, UseGuards, Body } from '@nestjs/common';

import { UserInterface } from '@daily-diabetes/shared-data';

import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { SkipAuth } from '../../decorators/skip-auth.decorator';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() request): Promise<any> {
    return request.user;
  }

  @SkipAuth()
  @Get('all')
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @SkipAuth()
  @Post('create')
  async createUser(@Body() patient: UserInterface): Promise<any> {
    return await this.usersService.create(patient);
  }

}
