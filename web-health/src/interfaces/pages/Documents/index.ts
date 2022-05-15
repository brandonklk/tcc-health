import { IUsers } from '../Login'

export enum ETypeProcedures {
  SURGERY = 1,
  EXAMS,
  VACCINES,
  PRESCRIPTION,
  CONTINUOUS_REMEDY,
}

export interface IDocumentFolder {
  nameFolder: string
}

export interface IFiles {
  file_id: number
  title: string
  title_storage: string
  create_date?: string // Date
}

export interface IMedProcedures {
  procedures_id?: number
  title?: string
  description?: string
  type_procedures?: ETypeProcedures
  files?: any[]
  user_id?: number
  user?: IUsers
  create_date?: Date
}

export interface IFilesDetails {
  file_title: string
  title_storage: string
  files_id: number
}

export interface IDetailsProcedures {
  description: string
  files: IFilesDetails[]
  procedures_id: number
  title_procedure: string
  type_procedures: ETypeProcedures
}

export type IFileProcedureSave = Required<
  Pick<
    IMedProcedures,
    'title' | 'description' | 'type_procedures' | 'user_id' | 'files'
  >
>

export interface IPropsListDocuments {
  documents: IMedProcedures[]
  redirectToDetailsProcedure: (procedureId: number) => void
}
