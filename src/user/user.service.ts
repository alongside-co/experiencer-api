import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      id: 1,
      email: {
        kakao: 'email@address.com',
      },
      username: 'sungjin',
      password: 'password',
    },
  ];

  create({ type, email, username, password }: CreateUserDto) {
    const newUser = {
      id: this.users.length,
      email: {
        [type]: email,
      },
      username,
      password,
    };

    this.users.push(newUser);

    return newUser;
  }

  async findOne(name: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === name);
  }

  async findByEmail({
    type,
    email,
  }: {
    type: 'kakao' | 'naver';
    email: string;
  }): Promise<User | undefined> {
    return this.users.find((user) => user.email[type] === email);
  }
}
