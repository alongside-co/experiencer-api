import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Recruit, RecruitDocument } from './schemas/recruit.schema';

@Injectable()
export class RecruitService {
  constructor(
    @InjectModel(Recruit.name) private recruitModel: Model<RecruitDocument>,
  ) {}

  async create(recruit: Recruit) {
    return new this.recruitModel(recruit);
  }
}