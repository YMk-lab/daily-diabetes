import { Module } from '@nestjs/common';

import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { LocalStrategy } from '../../strategies/local.strategy';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { environment } from '../../../environments/environment';
import { JwtAuthStrategy } from '../../strategies/jwt-auth.strategy';

@Module({
  controllers: [
    AuthController
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtAuthStrategy,
  ],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: `${ environment.server.jwt.access.secretKey }`,
      signOptions: { expiresIn: '30s' }
    })
  ],
  exports: [

  ]
})
export class AuthModule {}
