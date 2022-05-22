import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class ValidateMongoId implements PipeTransform<string> {
  transform(value: string): ObjectId {
    try {
      return ObjectId.createFromHexString(value);
    } catch (e: any) {
      throw new BadRequestException();
    }
  }
}
