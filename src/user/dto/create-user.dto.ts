import { IsEnum, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEnum(['kakao', 'naver'])
  channel: 'kakao' | 'naver';

  @IsString()
  socialId: string;

  @IsString()
  username: string;

  static from(data: CreateUserDto) {
    const createUserDto = new CreateUserDto();
    createUserDto.channel = data.channel;
    createUserDto.socialId = data.socialId;
    createUserDto.username = data.username;
    return createUserDto;
  }
}
