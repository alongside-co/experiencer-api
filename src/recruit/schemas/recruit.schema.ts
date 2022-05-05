import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

@Schema({ timestamps: true })
export class Recruit {
  @Prop()
  title: string;

  @Prop()
  image: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  candidates: User[];
}

export type RecruitDocument = Recruit & Document;
export const RecruitSchema = SchemaFactory.createForClass(Recruit);
