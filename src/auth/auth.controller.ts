import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('sign-in')
  async signIn(@Body() data: CreateUserDto) {
    const { type, socialId } = data;
    try {
      let user = await this.userService.findBySocialId({ type, id: socialId });

      if (!user) {
        user = await this.userService.create(data);
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
