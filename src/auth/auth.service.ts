import { Injectable } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';

import { UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // async validateUser(accessToken: string): Promise<any> {
  //   const payload = this.jwtService.verify(accessToken);
  //   const user = await this.userService.findOne(name);
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  async login(userId: Types.ObjectId) {
    const payload = { id: userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
