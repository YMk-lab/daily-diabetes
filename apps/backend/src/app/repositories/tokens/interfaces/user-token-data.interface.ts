import { UserInterface } from '@daily-diabetes/shared-data';

import { AuthPayloadInterface } from '../../auth/interfaces/auth-payload.interface';

export interface UserTokenDataInterface {
  user: UserInterface;
  fingerPrint: string;
  payload: AuthPayloadInterface;
}
