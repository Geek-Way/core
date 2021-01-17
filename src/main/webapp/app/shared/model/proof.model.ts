import { ICarrer } from 'app/shared/model/carrer.model';

export interface IProof {
  id?: number;
  typeClone?: string;
  name?: string;
  description?: any;
  score?: number;
  scoreLevel?: string;
  content?: any;
  status?: string;
  qoneQuest?: string;
  qoneAsr?: string;
  qoneOpt?: string;
  qoneUsr?: string;
  qtwoQuest?: string;
  qtwoAsr?: string;
  qtwoOpt?: string;
  qtwoUsr?: string;
  qtreQuest?: string;
  qtreAsr?: string;
  qtreOpt?: string;
  qtreUsr?: string;
  carrer?: ICarrer;
}

export const defaultValue: Readonly<IProof> = {};
