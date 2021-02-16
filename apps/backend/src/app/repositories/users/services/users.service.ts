import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { UserInterface } from '@daily-diabetes/shared-data';

import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async createUser(user: UserInterface): Promise<UserDocument | any> {

    const userExist = await this.userModel.findOne({ email: user.email });

    if (userExist) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'User already exist'
        },
        HttpStatus.CONFLICT
      )
    }

    user.password = await hash(user.password, 10);
    user.uuid = uuidv4();

    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findOneToValidate(emailOrPhone: string): Promise<UserDocument | any> {

    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    const phoneRegex = /^[+]*[(]?[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;

    const isEmail = emailRegex.test(emailOrPhone);
    const isPhone = phoneRegex.test(emailOrPhone);

    return this.userModel.findOne({ $or: [
        { email: (isEmail && !isPhone) ? emailOrPhone: '' },
        { phone: (!isEmail && isPhone) ? emailOrPhone : '' }
      ] });
  }

  async getMe(id: string): Promise<UserDocument | any> {
    const user = await this.userModel.findOne({ uuid: id }).select('-password');

    if (!user) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'User not found'
      }, HttpStatus.BAD_REQUEST);
    }

    return user;
  }
}
