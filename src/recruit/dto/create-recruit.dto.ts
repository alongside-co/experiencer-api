import { IsString, IsUrl } from 'class-validator';

import { UserDocument } from 'src/user/schemas/user.schema';

export class CreateRecruitDto {
  @IsString()
  title: string;

  @IsUrl()
  image: string;

  @IsString()
  description: string;

  toEntity(user: UserDocument) {
    return {
      title: this.title,
      image: this.image,
      description: this.description,
      owner: user._id,
      candidates: [],
    };
  }
}
