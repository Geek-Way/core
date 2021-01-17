import { IVocationalTest } from 'app/shared/model/vocational-test.model';
import { IUser } from 'app/shared/model/user.model';

export interface ICarrer {
  id?: number;
  typeClone?: string;
  name?: string;
  description?: any;
  score?: number;
  scoreLevel?: string;
  vocationalTest?: IVocationalTest;
  user?: IUser;
}

export const defaultValue: Readonly<ICarrer> = {};
