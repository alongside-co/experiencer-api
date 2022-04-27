import { IsEnum, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEnum(['kakao', 'naver'])
  readonly type: 'kakao' | 'naver';

  @IsString()
  readonly socialId: string;

  @IsString()
  readonly username: string;
}
