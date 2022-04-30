import { Controller, Get, Request, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUser(@Request() req) {
    const user = await this.userService.findById(req.user.id);

    if (user) {
      return { success: true, data: user };
    } else {
      return { success: false, message: 'no sign up' };
    }
  }
}
