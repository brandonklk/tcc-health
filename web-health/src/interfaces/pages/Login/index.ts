import { Role } from 'roles/roles'

import { IToasterFeedback } from 'interfaces/components/ToasterFeedback'
import { IFiles } from '../Documents'

export enum ILanguageUser {
  ptBr = 'pt',
  enUs = 'en',
}

export interface IUsers extends Partial<IFiles> {
  userId: number
  name: string
  email: string
  password: string
  phone: number | null
  role?: Role[]
  language?: ILanguageUser
  create_date?: string // Date
  avatarId?: number
  avatar?: any
  token?: string
  confirmPassword?: string
}

export type ISaveUserEdition = Pick<
  IUsers,
  'name' | 'email' | 'phone' | 'language' | 'avatar' | 'password' | 'userId'
>

export type ICreateUser = Pick<
  IUsers,
  'name' | 'email' | 'phone' | 'language' | 'avatar' | 'password' | 'role'
>

export interface ILogin {
  email: string
  password: string
}

export interface IAuthUser extends IToasterFeedback {
  user: IUsers
}
