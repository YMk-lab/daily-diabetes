import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from './repositories/users/users.module';
import { AuthModule } from './repositories/auth/auth.module';
import { CasesModule } from './repositories/cases/cases.module';
import { ENV_VARS } from './config/variables';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    CasesModule,
    PassportModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `
          ${configService.get<string>(ENV_VARS.DATABASE_HOST)}:
          ${configService.get<string>(ENV_VARS.DATABASE_PORT)}
        `,
        dbName: `${configService.get<string>(ENV_VARS.DATABASE_NAME)}`,
        useFindAndModify: false
      }),
      inject: [ConfigService]
    })
  ],
})
export class AppModule { }
