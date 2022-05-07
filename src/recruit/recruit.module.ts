import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RecruitService } from './recruit.service';
import { RecruitController } from './recruit.controller';
import { Recruit, RecruitSchema } from './schemas/recruit.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recruit.name, schema: RecruitSchema }]),
  ],
  controllers: [RecruitController],
  providers: [RecruitService],
})
export class RecruitModule {}
