import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-custom';
import { AuthService } from './auth.service';

@Injectable()
export class SocialStrategy extends PassportStrategy(Strategy, 'social') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(request: Request): Promise<any> {
    console.log('social validate', request);
    return true;
  }
}
