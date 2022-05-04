import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

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
    const profile = await this.authService.getSocialProfile(authDto);

    if (!profile) {
      throw new UnauthorizedException();
    }

    let user = await this.userService.findBySocialId({
      channel,
      id: profile.id,
    });

    if (!user) {
      const userDto = CreateUserDto.from({
        channel,
        socialId: profile.id,
        username: profile.kakao_account.profile.nickname,
      });
      user = await this.userService.create(userDto);
    }

    const accessToken = this.jwtService.sign({ id: user._id });

    return { data: accessToken };
  }
}
