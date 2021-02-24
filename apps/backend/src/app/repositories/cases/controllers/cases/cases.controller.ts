import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../../../guards/jwt-auth.guard';
import { CasesService } from '../../services/cases/cases.service';
import { Case } from '../../schemas/case.schema';
import { CaseGroupDocument } from '../../schemas/case-group.schema';

@Controller('cases')
export class CasesController {

  constructor(private caseService: CasesService) { }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body('newCase') newCase: Case): Promise<any> {
    return this.caseService.create(newCase);
  }

  @UseGuards(JwtAuthGuard)
  @Post('all')
  async findAll(@Body('userId') userId: string): Promise<CaseGroupDocument[] | any> {
    return this.caseService.findAll(userId);
  }

}
