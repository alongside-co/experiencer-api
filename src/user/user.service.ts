import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create({
    type,
    socialId,
    username,
  }: CreateUserDto): Promise<UserDocument> {
    const newUser = {
      socialIds: {
        [type]: socialId,
      },
      username,
    };

    const createdUser = new this.userModel(newUser);
    return createdUser.save();
  }

  async findBySocialId({
    type,
    id,
  }: {
    type: 'kakao' | 'naver';
    id: string;
  }): Promise<UserDocument | undefined> {
    const key = `socialIds.${type}`;
    return this.userModel.findOne({ [key]: id });
  }
}
