import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt';

import { UserInterface } from '@daily-diabetes/shared-data';

import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

  async create(user: UserInterface): Promise<User | any> {

    const isUserExist = await this.userModel.findOne({ email: user.email });

    if (isUserExist) {
      throw new HttpException(
        { status: HttpStatus.CONFLICT, error: 'User already exist', },
        HttpStatus.CONFLICT
      );
    }

    user.password = await hash(user.password, 10);
    const createdUser = await this.userModel.create(user);

    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email: email });

    if (!user) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'User does not exist' },
        HttpStatus.NOT_FOUND
      );
    }

    const passwordsMatch = await compare(password, user.password);

    if (!passwordsMatch) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Wrong credentials provided'
      }, HttpStatus.BAD_REQUEST);
    }

    return user;
  }
}
