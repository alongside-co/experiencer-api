import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

import { User, UserDocument } from './schemas/user.schema';

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
}
