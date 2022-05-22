import { ObjectId } from 'mongodb';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { UserDocument } from './../user/schemas/user.schema';
import { GetUser } from 'src/auth/decorator';
import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import { RecruitService } from './recruit.service';
import { CreateRecruitDto } from './dto/create-recruit.dto';
import { UserService } from 'src/user/user.service';
import { ValidateMongoId } from 'src/pipe/validateMongoId.pipe';

@Controller('recruit')
export class RecruitController {
  constructor(
    private readonly recruitService: RecruitService,
    private readonly userService: UserService,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  @Get()
  async getRecruits() {
    const recruits = await this.recruitService.getAll();
    return { data: recruits };
  }

  @Get(':id')
  async getRecruit(@Param('id', ValidateMongoId) id: ObjectId) {
    const recruit = await this.recruitService.getById(id);
    return { data: recruit };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createRecruits(
    @GetUser() user: UserDocument,
    @Body() createRecruitDto: CreateRecruitDto,
  ) {
    const transactionSesstion = await this.connection.startSession();
    transactionSesstion.startTransaction();

    try {
      const newRecruit = await this.recruitService.create(
        createRecruitDto.toEntity(user),
      );
      await this.userService.addNewRecruit(user, newRecruit);

      transactionSesstion.commitTransaction();
      return { data: newRecruit };
    } catch (error) {
      console.log('error: ', error);
      transactionSesstion.abortTransaction();
    } finally {
      transactionSesstion.endSession();
    }
  }
}
