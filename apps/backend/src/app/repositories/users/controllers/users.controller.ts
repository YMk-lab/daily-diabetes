import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { UsersService } from '../services/users.service';
import { SkipAuth } from '../../../decorators/skip-auth.decorator';
import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';
import { UserDocument } from '../schemas/user.schema';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) { }

  @SkipAuth()
  @Post('create')
  async create(@Body() body: any): Promise<UserDocument> {
    return this.usersService.createUser(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getProfile(@Param() userId: any): Promise<UserDocument> {
    return this.usersService.findById(userId.id);
  }
}
