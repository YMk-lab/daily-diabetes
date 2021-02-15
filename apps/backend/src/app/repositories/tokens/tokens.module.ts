import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RefreshToken, RefreshTokenSchema } from './schemas/refresh-token.schema';
import { TokensController } from './controllers/tokens.controller';
import { TokensService } from './services/tokens.service';
import { SharedModule } from '../../shared.module';

@Module({
  controllers: [
    TokensController
  ],
  providers: [
    TokensService
  ],
  imports: [
    SharedModule,
    MongooseModule.forFeature([
      { name: RefreshToken.name, schema: RefreshTokenSchema }
    ])
  ],
  exports: [
    TokensService
  ]
})
export class TokensModule {}
