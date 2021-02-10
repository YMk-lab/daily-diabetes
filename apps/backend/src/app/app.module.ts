import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { environment } from '../environments/environment';
import { AuthModule } from './repositories/auth/auth.module';
import { UsersModule } from './repositories/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';


@Module({
  controllers: [

  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
  imports: [
    AuthModule,
    UsersModule,
    PassportModule,
    MongooseModule.forRoot(
      `${environment.server.db.host}:${environment.server.db.port}/${environment.server.db.name}`,
      {
        useFindAndModify: false
      }
    )
  ],
})
export class AppModule { }
