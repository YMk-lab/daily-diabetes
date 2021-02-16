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
  private tokensList: RefreshTokenDocument[];
  private currentUserDevice: RefreshTokenDocument;
  private currentUserSession: RefreshTokenDocument;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshTokenDocument>
  ) { }

  async createToken(userTokenData: UserTokenDataInterface): Promise<RefreshTokenDocument | any> {

    this.userTokenData = userTokenData;

    this.tokensList = await this.refreshTokenModel.find({
      userId: userTokenData.user.uuid
    });
    this.currentUserDevice = await this.refreshTokenModel.findOne({
      userId: userTokenData.user.uuid,
      fingerPrint: userTokenData.fingerPrint
    });
    this.currentUserSession = new this.refreshTokenModel({
      userId: this.userTokenData.user.uuid,
      refreshToken: this.signRefreshToken(this.userTokenData.payload),
      fingerPrint: this.userTokenData.fingerPrint
    });

    if (this._maxReachedSessionPerUser()) {
      return await this.removeUserSessionsExceptLast();
    }

    return await this.performSession();
  }

  async findByToken(token: string): Promise<RefreshTokenDocument | any> {
    return await this.refreshTokenModel.findOne({ refreshToken: token }).exec();
  }

  async revoke(token: string): Promise<RefreshTokenDocument | any> {
    return await this.refreshTokenModel.findOneAndRemove({ refreshToken: token }).exec();
  }

  signAccessToken(payload: AuthPayloadInterface): string {
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string): any {
    return this.jwtService.verify(token, {
      secret: this.configService.get<string>(ENV_VARS.REFRESH_TOKEN)
    });
  }

  private signRefreshToken(payload: AuthPayloadInterface): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>(ENV_VARS.REFRESH_TOKEN),
      expiresIn: this.configService.get<string>(ENV_VARS.REFRESH_TOKEN_EXPIRES)
    });
  }

  private async performSession(): Promise<RefreshTokenDocument | any> {
    const hasUserRefreshToken = this.tokensList && !this.tokensList.length && !this.currentUserDevice;
    const hasUserCurrentSession = this.tokensList && this.tokensList.length && this.currentUserDevice;

    if (hasUserRefreshToken || !this.currentUserDevice) {
      return await this.saveToken();
    }

    if (hasUserCurrentSession) {
      return await this.updateToken();
    }
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
    },{ refreshToken: this.signRefreshToken(this.userTokenData.payload) }).exec();
  }

  private async removeUserSessionsExceptLast(): Promise<RefreshTokenDocument | any> {

    await this.refreshTokenModel.deleteMany({
      userId: this.userTokenData.user.uuid
    });

    return this.currentUserSession.save();
  }

  private _maxReachedSessionPerUser = (): boolean => {
    const newDevice = !this.tokensList
      .map((device: RefreshTokenDocument) => device.fingerPrint)
      .includes(this.userTokenData.fingerPrint);

    const reachedMaxDevices = this.tokensList.length === +this.configService.get<string>(ENV_VARS.ALLOWED_DEVICES_COUNT);
    return reachedMaxDevices && newDevice;
  }
}
