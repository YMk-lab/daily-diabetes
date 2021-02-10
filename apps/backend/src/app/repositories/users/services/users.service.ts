import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

  private readonly users = [
    {
      id: 1,
      email: 'moryliak.y@gmail.com',
      password: '12345678'
    }
  ];

  async findOne(email: string): Promise<any> {
    return this.users.find((user) => user.email === email);
  }

}
