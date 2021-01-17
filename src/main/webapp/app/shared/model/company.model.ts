export interface ICompany {
  id?: number;
  name?: string;
  identifier?: string;
  email?: string;
  phone?: string;
}

export const defaultValue: Readonly<ICompany> = {};
