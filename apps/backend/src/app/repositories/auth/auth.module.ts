import { Module } from '@nestjs/common';

import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { LocalStrategy } from '../../strategies/local.strategy';

@Module({
  controllers: [
    AuthController
  ],
  providers: [
    AuthService,
    LocalStrategy
  ],
  imports: [

  ],
  exports: [

  ]
})
export class AuthModule {}
