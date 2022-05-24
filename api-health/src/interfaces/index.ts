export interface IMessageFeedback {
  msg: string;
  type: 'error' | 'warn' | 'success';
}

export interface IFiles {
  files_id: number;
  title: string;
  title_storage: string;
  procedures_id?: number;
  procedures?: IHealthProcedures;
  create_date?: Date;
}

export interface IUsers extends Partial<IFiles> {
  userId?: number;
  name?: string;
  email?: string;
  password?: string;
  create_date?: Date;
  phone?: number;
  role?: string[];
  language?: 'pt' | 'en';
  avatarId?: number;
  avatar?: any;
}

export type INewUser = Pick<
  IUsers,
  | 'name'
  | 'email'
  | 'password'
  | 'phone'
  | 'avatarId'
  | 'create_date'
  | 'avatar'
>;

export type IEditUser = Pick<
  IUsers,
  'userId' | 'name' | 'email' | 'password' | 'phone' | 'avatar' | 'avatarId'
>;

export interface IHealthProcedures extends Partial<IFiles> {
  procedures_id?: number;
  title?: string;
  description?: string;
  type_procedures?: number;
  user_id?: number;
  user?: IUsers;
  procedures_uuid?: string;
  create_date?: Date;
}

export interface IDetailsProcedure extends IHealthProcedures {
  files: Partial<IFiles>[];
}

export interface IFileInsert extends Express.Multer.File {
  procedureId: number;
}

export interface IAuth {
  email: string;
  password: string;
}
