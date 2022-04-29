import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';

import { AuthDto } from './dto/auth.dto';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  async getSocialProfile(data: AuthDto) {
    const { channel, accessToken } = data;
    if (channel === 'kakao') {
      return await lastValueFrom(
        this.httpService
          .get('https://kapi.kakao.com/v2/user/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .pipe(map((res) => res.data)),
      );
    }
  }

  async login(userId: Types.ObjectId) {
    const payload = { id: userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
