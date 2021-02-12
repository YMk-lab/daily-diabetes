import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from './repositories/users/users.module';
import { AuthModule } from './repositories/auth/auth.module';
import { ENV_VARS } from './config/variables';

@Module({
  controllers: [ ],
  providers: [],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    PassportModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `
          ${configService.get<string>(ENV_VARS.DATABASE_HOST)}:
          ${configService.get<string>(ENV_VARS.DATABASE_PORT)}
        `,
        dbName: `${configService.get<string>(ENV_VARS.DATABASE_NAME)}`
      }),
      inject: [ConfigService]
    })
  ],
})
export class AppModule { }
