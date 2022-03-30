import { UserService } from './user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-in')
  async signIn(@Body() data: CreateUserDto) {
    const { type, email } = data;
    let user = await this.userService.findByEmail({ type, email });

    if (!user) {
      user = this.userService.create(data);
    }

    return user;
  }
}
