import { Controller, Get } from '@nestjs/common';

@Controller('recruit')
export class RecruitController {
  @Get()
  getRecruits() {
    return { data: 'get all recruits ' };
  }
}
