import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { UserInterface } from '@daily-diabetes/shared-data';

import { User, UserDocument } from '../schemas/user.schema';
import { errorTranslationKeys } from '../../../config/errors-translations-keys';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async createUser(user: UserInterface): Promise<UserDocument | any> {

    const userExist = await this.userModel.findOne({ email: user.email });

    if (userExist) {
      throw new HttpException(
        {
          title: errorTranslationKeys.USER_SAVE_TITLE,
          error: errorTranslationKeys.USER_SAVE_TEXT
        },
        HttpStatus.CONFLICT
      );
    }

    user.password = await hash(user.password, 10);
    user.uuid = uuidv4();

    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findOneToValidate(email: string): Promise<UserDocument | any> {
    return this.userModel.findOne({ email: email });
  }

  async getMe(id: string): Promise<UserDocument | any> {
    const user = await this.userModel.findOne({ uuid: id }).select('-password');

    if (!user) {
      throw new HttpException({
        title: errorTranslationKeys.USER_NOT_FOUND_TITLE,
        error: errorTranslationKeys.USER_NOT_FOUND_TEXT
      }, HttpStatus.BAD_REQUEST);
    }

    return user;
  }
}
