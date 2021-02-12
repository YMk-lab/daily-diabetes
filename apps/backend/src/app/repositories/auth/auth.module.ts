import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './service/auth.service';
import { LocalStrategy } from '../../strategies/local.strategy';
import { UsersModule } from '../users/users.module';
import { JwtAuthStrategy } from '../../strategies/jwt-auth.strategy';

import { ENV_VARS } from '../../config/variables';

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
    JwtModule.registerAsync({
      imports: [ConfigModule],
      // TODO move everything into class
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(ENV_VARS.ACCESS_TOKEN),
        signOptions: { expiresIn: configService.get<string>(ENV_VARS.ACCESS_TOKEN_EXPIRES) }
      }),
      inject: [ConfigService]
    })
  ]
})
export class AuthModule {}
