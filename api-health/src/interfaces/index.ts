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
  user_id?: number;
  name?: string;
  email?: string;
  password?: string;
  create_date?: Date;
  phone?: number;
  role?: string[];
  language?: 'pt' | 'en';
  avatarId?: number;
  avatar_id?: number;
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
  | 'userId'
  | 'name'
  | 'email'
  | 'password'
  | 'phone'
  | 'avatar'
  | 'avatarId'
  | 'avatar_id'
  | 'user_id'
>;

export type IDocumentHealth = {
  documento_health_id: number;
  procedures_id: number;
  files_id: number;
  create_date: Date;
};

export interface IHealthProcedures extends Partial<IFiles> {
  procedures_id?: number;
  title?: string;
  description?: string;
  type_procedures?: number;
  user_id?: number;
  user?: IUsers;
  files?: Partial<IDocumentHealth>[];
  files_multer?: Express.Multer.File[];
  procedures_uuid?: string;
  create_date?: Date;
}

type IFilesDetailsProcedure = {
  file_title: string;
  title_storage: string;
  files_id: number;
};

export interface IDetailsProcedure {
  procedures_id: number;
  title_procedure: string;
  type_procedures: number;
  description: string;
  files?: IFilesDetailsProcedure[];
  files_id?: number | null;
  file_title?: string | null;
  title_storage?: string | null;
}

export interface IFileInsert extends Express.Multer.File {
  procedureId: number;
}

export interface IAuth {
  email: string;
  password: string;
}

export type IDocumentsProcedureSave = Omit<
  IDocumentHealth,
  'documento_health_id'
>;
