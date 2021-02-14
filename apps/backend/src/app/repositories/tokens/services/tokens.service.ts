import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RefreshToken, RefreshTokenDocument } from '../schemas/refresh-token.schema';
import { UserTokenDataInterface } from '../interfaces/user-token-data.interface';
import { AuthPayloadInterface } from '../../auth/interfaces/auth-payload.interface';
import { ENV_VARS } from '../../../config/variables';

@Injectable()
export class TokensService {

  private userTokenData: UserTokenDataInterface;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshTokenDocument>
  ) { }

  async createToken(userTokenData: UserTokenDataInterface): Promise<RefreshTokenDocument> {

    this.userTokenData = userTokenData;

    const tokensList = await this.refreshTokenModel.find({
      userId: userTokenData.user.uuid
    });

    const currentDevice = await this.refreshTokenModel.findOne({
      userId: userTokenData.user.uuid,
      fingerPrint: userTokenData.fingerPrint
    });

    const hasUserRefreshToken = tokensList && !tokensList.length && !currentDevice;
    const hasUserCurrentSession = tokensList && tokensList.length && currentDevice;

    if (hasUserRefreshToken) {
      return await this.saveToken();
    }

    if (hasUserCurrentSession) {
      return await this.updateToken();
    }

  }

  async findByToken(token: string): Promise<RefreshTokenDocument | any> {
    return await this.refreshTokenModel.findOne({ refreshToken: token }).exec();
  }

  signAccessToken(payload: AuthPayloadInterface): string {
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string): object {
    return this.jwtService.verify(token, {
      secret: this.configService.get<string>(ENV_VARS.REFRESH_TOKEN)
    });
  }

  async revoke(token: string): Promise<RefreshTokenDocument | any> {
    return await this.refreshTokenModel.findOneAndRemove({ refreshToken: token }).exec();
  }

  private signRefreshToken(payload: AuthPayloadInterface): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>(ENV_VARS.REFRESH_TOKEN),
      expiresIn: this.configService.get<string>(ENV_VARS.REFRESH_TOKEN_EXPIRES)
    });
  }

  private async saveToken(): Promise<RefreshTokenDocument | any> {
    return await new this.refreshTokenModel({
      userId: this.userTokenData.user.uuid,
      refreshToken: this.signRefreshToken(this.userTokenData.payload),
      fingerPrint: this.userTokenData.fingerPrint
    }).save();
  }

  private async updateToken(): Promise<RefreshTokenDocument | any> {
    return await this.refreshTokenModel.findOneAndUpdate({
      userId: this.userTokenData.user.uuid,
      fingerPrint: this.userTokenData.fingerPrint
    },{ refreshToken: this.signRefreshToken(this.userTokenData.payload) },
      { new: true }).exec();
  }
}
