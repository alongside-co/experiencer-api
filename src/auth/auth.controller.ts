import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('/sign-in')
  signIn() {
    return 'it should return auth token';
  }
  @Post('sign-up')
  signUp() {
    return 'sign up';
  }
}
