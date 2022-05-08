import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Recruit } from 'src/recruit/schemas/recruit.schema';

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

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recruit' }] })
  ownRecruits: Recruit[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
