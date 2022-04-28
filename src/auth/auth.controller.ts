import { HttpService } from '@nestjs/axios';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly httpService: HttpService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('sign-in')
  async signIn(@Body() data: AuthDto) {
    let profile = null;

    try {
      profile = await this.authService.getSocialProfile(data);
    } catch (e: any) {
      return { success: false, message: e.message };
    }

    try {
      if (!profile) {
        return { success: false, message: 'login fail' };
      }

      let user = await this.userService.findBySocialId({
        type: data.channel,
        id: profile.id,
      });

      if (!user) {
        user = await this.userService.create({
          type: data.channel,
          socialId: profile.id,
          username: profile.profile.nickname,
        });
      }

      return { success: true, data: this.jwtService.sign({ id: user._id }) };
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  }

  @Post('sign-up')
  signUp() {
    return {
      message: 'sign up',
    };
  }
}
