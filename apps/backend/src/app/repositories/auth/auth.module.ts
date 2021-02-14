import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { SharedModule } from '../../shared.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './service/auth.service';
import { LocalStrategy } from '../../strategies/local.strategy';
import { UsersModule } from '../users/users.module';
import { JwtAuthStrategy } from '../../strategies/jwt-auth.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtAuthStrategy
  ],
  imports: [
    UsersModule,
    PassportModule,
    SharedModule
  ]
})
export class AuthModule {}
