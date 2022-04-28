import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot(
      'mongodb+srv://sungjin:vWkvxRsjNepZGR2k@cluster0.dihvd.mongodb.net/exper?retryWrites=true&w=majority',
    ),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
