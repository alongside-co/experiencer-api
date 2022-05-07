import { UserDocument } from './../user/schemas/user.schema';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { GetUser } from 'src/auth/decorator';
import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import { RecruitService } from './recruit.service';
import { CreateRecruitDto } from './dto/create-recruit.dto';

@Controller('recruit')
export class RecruitController {
  constructor(private readonly recruitService: RecruitService) {}

  @Get()
  getRecruits() {
    return { data: 'get all recruits ' };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createRecruits(
    @GetUser() user: UserDocument,
    @Body() createRecruitDto: CreateRecruitDto,
  ) {
    const newRecruit = await this.recruitService.create(
      createRecruitDto.toEntity(user),
    );

    return { data: newRecruit };
  }
}
