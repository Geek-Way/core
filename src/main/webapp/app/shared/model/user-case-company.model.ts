import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { ICompany } from 'app/shared/model/company.model';

export interface IUserCaseCompany {
  id?: number;
  typeClone?: string;
  name?: string;
  description?: any;
  score?: number;
  content?: any;
  feedback?: any;
  devStatus?: string;
  devNotes?: any;
  feedbackStatus?: string;
  linkProject?: string;
  deadline?: string;
  user?: IUser;
  company?: ICompany;
}

export const defaultValue: Readonly<IUserCaseCompany> = {};
