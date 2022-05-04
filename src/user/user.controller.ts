import { Controller, Get, UseGuards } from '@nestjs/common';

import { GetUser } from 'src/auth/decorator';
import { JwtAuthGuard } from '../auth/guard';
import { UserDocument } from './schemas/user.schema';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getUser(@GetUser() user: UserDocument) {
    return { data: user };
  }
}
