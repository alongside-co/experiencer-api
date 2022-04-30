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
  async signIn(@Body() authDto: AuthDto) {
    const { channel } = authDto;
    try {
      const profile = await this.authService.getSocialProfile(authDto);

      if (!profile) {
        throw new UnauthorizedException();
      }

      let user = await this.userService.findBySocialId({
        channel,
        id: profile.id,
      });

      console.log(profile.kakao_account.profile);
      if (!user) {
        user = await this.userService.create({
          channel,
          socialId: profile.id,
          username: profile.kakao_account.profile.nickname,
        });
      }

      const accessToken = this.jwtService.sign({ id: user._id });

      return { success: true, data: accessToken };
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  }
}
