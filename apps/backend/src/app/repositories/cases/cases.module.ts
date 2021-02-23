import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CasesController } from './controllers/cases/cases.controller';
import { CasesService } from './services/cases/cases.service';
import { CaseGroup, CaseGroupSchema } from './schemas/case-group.schema';

@Module({
  controllers: [
    CasesController
  ],
  providers: [
    CasesService
  ],
  imports: [
    MongooseModule.forFeature([
      { name: CaseGroup.name, schema: CaseGroupSchema }
    ])
  ],
  exports: [
    CasesService
  ]
})
export class CasesModule { }
