import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop(
    raw({
      kakao: { type: String },
      naver: { type: String },
    }),
  )
  email: {
    kakao?: string;
    naver?: string;
  };

  @Prop()
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
