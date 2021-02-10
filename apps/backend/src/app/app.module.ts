import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { environment } from '../environments/environment';
import { AuthModule } from './repositories/auth/auth.module';


@Module({
  controllers: [

  ],
  providers: [

  ],
  imports: [
    AuthModule,
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
