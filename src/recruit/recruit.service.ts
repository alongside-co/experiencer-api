import { ObjectId } from 'mongodb';
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
    const newRecruit = new this.recruitModel(recruit);
    return await newRecruit.save();
  }

  async getAll() {
    return await this.recruitModel.find();
  }

  async getById(id: ObjectId) {
    return await this.recruitModel.findById(id);
  }
}
