import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CaseGroup, CaseGroupDocument } from '../../schemas/case-group.schema';
import { Case } from '../../schemas/case.schema';

@Injectable()
export class CasesService {

  constructor(@InjectModel(CaseGroup.name) private caseGroupModel: Model<CaseGroupDocument>) { }

  async create(newCase: Case): Promise<CaseGroupDocument | any> {

    const foundCaseGroup = await this.caseGroupModel.findOne({
      userId: newCase.userId,
      title: newCase.currentDay
    });

    if (!foundCaseGroup) {
      const createdCaseGroup = new this.caseGroupModel({
        userId: newCase.userId,
        title: newCase.currentDay
      });
      const savedCaseGroup = await createdCaseGroup.save();

      return await savedCaseGroup.updateOne({
        uuid: savedCaseGroup.uuid,
        $push: { caseList: newCase }
      }).exec();
    }

    if (foundCaseGroup) {
      return await foundCaseGroup.updateOne({
        uuid: foundCaseGroup.uuid,
        $push: { caseList: newCase }
      }).exec();
    }

  }

  async findAll(userId: string): Promise<CaseGroupDocument | any> {
    return this.caseGroupModel.find({ userId: userId });
  }
}
