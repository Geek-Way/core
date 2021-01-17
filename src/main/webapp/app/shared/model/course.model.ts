import { ICarrer } from 'app/shared/model/carrer.model';

export interface ICourse {
  id?: number;
  typeClone?: string;
  name?: string;
  description?: any;
  score?: number;
  scoreLevel?: string;
  content?: any;
  videoUrl?: string;
  viewed?: boolean;
  carrer?: ICarrer;
}

export const defaultValue: Readonly<ICourse> = {
  viewed: false,
};
