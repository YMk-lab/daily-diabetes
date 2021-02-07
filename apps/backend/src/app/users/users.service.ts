import { Injectable } from '@nestjs/common';
import { LoginInterface } from '@daily-diabetes/shared-data';

@Injectable()
export class UsersService {

  private readonly users = [
    {
      id: 1,
      email: 'test@test.com',
      password: '12345678'
    },
    {
      id: 1,
      email: 'test@test.com',
      password: '12345678'
    }
  ];

  async findOne(email: string): Promise<any> {
    return this.users.find((user) => user.email === email);
  }

}
