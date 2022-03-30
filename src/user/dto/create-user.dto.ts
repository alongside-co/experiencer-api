import { IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEnum(['kakao', 'naver'])
  readonly type: 'kakao' | 'naver';

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
