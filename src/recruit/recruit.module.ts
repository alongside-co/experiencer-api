import { Module } from '@nestjs/common';
import { RecruitController } from './recruit.controller';

@Module({
  controllers: [RecruitController],
})
export class RecruitModule {}
