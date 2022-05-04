import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop(
    raw({
      kakao: { type: String },
      naver: { type: String },
    }),
  )
  socialIds: {
    kakao?: string;
    naver?: string;
  };

  @Prop()
  username: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
