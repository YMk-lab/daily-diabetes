import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ENV_VARS } from './config/variables';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(ENV_VARS.ACCESS_TOKEN),
        signOptions: { expiresIn: configService.get<string>(ENV_VARS.ACCESS_TOKEN_EXPIRES) }
      }),
      inject: [ConfigService]
    })
  ],
  exports: [
    JwtModule
  ]
})
export class SharedModule { }
