import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('sign-in')
  async signIn(@Body() data: AuthDto) {
    let profile = null;

    try {
      profile = await this.authService.getSocialProfile(data);
      if (!profile) {
        throw new UnauthorizedException();
      }
    } catch (e: any) {
      return { success: false, message: e.message };
    }

    try {
      let user = await this.userService.findBySocialId({
        type: data.channel,
        id: profile.id,
      });

      if (!user) {
        user = await this.userService.create({
          type: data.channel,
          socialId: profile.id,
          username: profile.kakao_account.profile.nickname,
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
