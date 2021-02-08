import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserInterface } from '@daily-diabetes/shared-data';

import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {

  private readonly users = [
    {
      id: 1,
      email: 'test@test.com',
      password: '12345678',
      roles: []
    },
    {
      id: 1,
      email: 'test@test.com',
      password: '12345678',
      roles: []
    }
  ];

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

  async create(user: UserInterface): Promise<User | any> {

    // check if user exist
    // if exist send SpecificError with gasket error handler
    // if user does not exist crypt his password
    // save user
    // return user without password

    const isUserExist = await this.userModel.findOne({ email: user.email });

    if (isUserExist) {
      return { error: 'User already taken' };
    }

    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(email: string): Promise<any> {
    return this.users.find((user) => user.email === email);
  }

}
