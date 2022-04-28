import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';

import { UserDocument } from '../user/schemas/user.schema';
import { AuthDto } from './dto/auth.dto';
import { lastValueFrom, map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
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

  async getSocialProfile(data: AuthDto) {
    const { channel, accessToken } = data;
    if (channel === 'kakao') {
      const res = await lastValueFrom(
        this.httpService
          .get('https://kapi.kakao.com/v2/user/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .pipe(map((res) => res.data)),
      );
      return res;
    }
  }

  async login(userId: Types.ObjectId) {
    const payload = { id: userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
