import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './repositories/auth/auth.module';
import { UsersModule } from './repositories/users/users.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { environment } from '../environments/environment';


@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(
      `${environment.server.db.host}:${environment.server.db.port}/${environment.server.db.name}`
    )
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule { }
