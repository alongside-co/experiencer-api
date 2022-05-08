import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { RecruitDocument } from 'src/recruit/schemas/recruit.schema';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const newUser = {
      socialIds: {
        [createUserDto.channel]: createUserDto.socialId,
      },
      username: createUserDto.username,
    };
    const createdUser = new this.userModel(newUser);

    return createdUser.save();
  }

  async findBySocialId({
    channel,
    id,
  }: {
    channel: 'kakao' | 'naver';
    id: string;
  }): Promise<UserDocument | undefined> {
    const key = `socialIds.${channel}`;
    return this.userModel.findOne({ [key]: id });
  }

  async findById(id: Types.ObjectId) {
    return await this.userModel.findById(id);
  }

  async update({ _id, ...rest }: Partial<UserDocument>) {
    return await this.userModel.findByIdAndUpdate(_id, rest, {
      new: true,
    });
  }

  async addNewRecruit(user: UserDocument, newRecruit: RecruitDocument) {
    return await this.userModel.findByIdAndUpdate(
      user._id,
      {
        $push: { ownRecruits: newRecruit._id },
      },
      { new: true },
    );
  }
}
