import { ILogin, IUsers } from 'interfaces/pages/Login'
import {
  ETypeProcedures,
  IDocumentFolder,
  IFileProcedureSave,
} from 'interfaces/pages/Documents'

import { array, number, object, string } from 'yup'

export const userLocalStorage = '@user'
export const tokenAuth = '@token'

export const fourMB = 4 * 1024 * 1024
export const extensionFilesAccepted = ['image/jpeg', 'image/png', 'application/pdf']

export const initialValuesUser: IUsers = {
  userId: 0,
  name: '',
  email: '',
  password: '',
  phone: null,
  avatarId: 0,
  avatar: '',
}

export const initialValuesLogin: ILogin = {
  email: '',
  password: '',
}

export const initialValuesFolder: IDocumentFolder = {
  nameFolder: '',
}

export const initialValuesFile: IFileProcedureSave = {
  title: '',
  description: '',
  type_procedures: ETypeProcedures.VACCINES,
  user_id: 0,
  files: [],
}

export const validationSchemaLogin = object({
  email: string().email('invalid_email').trim().required('required'),
  password: string().trim().required('required'),
})

export const validationSchemaFolder = object({
  nameFolder: string().trim().required('required'),
})

export const validationSchemaFiles = object({
  title: string().trim().max(255, 'max_lenght_phrase').required('required'),
  description: string()
    .trim()
    .max(255, 'max_lenght_phrase')
    .required('required'),
  type_procedures: number(),
  user_id: number(),
  files: array(),
})
