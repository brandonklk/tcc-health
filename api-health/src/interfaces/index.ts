export interface IMessageFeedback {
  msg: string;
  type: 'error' | 'warn' | 'success';
}

export interface IFiles {
  files_id: number;
  title: string;
  title_storage: string;
  procedures_id?: number;
  procedures?: IMedProcedures;
  create_date?: Date;
}

export interface IUsers extends Partial<IFiles> {
  user_id?: number;
  name?: string;
  email?: string;
  password?: string;
  create_date?: Date;
  phone?: number;
  role?: string[];
  language?: 'pt' | 'en';
  avatar_id?: number;
}

export interface IMedProcedures extends Partial<IFiles> {
  procedures_id?: number;
  title?: string;
  description?: string;
  type_procedures?: number;
  user_id?: number;
  user?: IUsers;
  procedures_uuid?: string;
  create_date?: Date;
}

export interface IDetailsProcedure extends IMedProcedures {
  files: Partial<IFiles>[];
}

export interface IFileInsert extends Express.Multer.File {
  procedureId: number;
}
