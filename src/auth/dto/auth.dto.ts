import { IsEnum, IsString } from 'class-validator';

export class AuthDto {
  @IsEnum(['kakao', 'naver'])
  readonly channel: 'kakao' | 'naver';

  @IsString()
  readonly accessToken: string;
}
