import { tokenAuth, userLocalStorage } from 'constants/constantsApp'
import { IUsers } from 'interfaces/pages/Login'
import { Role } from 'roles/roles'

const URL_FILES = process.env.REACT_APP_URL_FILES || ''

export const hasPermissionUser = (currentUser: IUsers, roles: Role[]) => {
  let isAuthorized = true

  if (currentUser.role && currentUser.role.length > 0) {
    isAuthorized = currentUser.role.some(role => {
      console.log('role', role)
      return !roles.includes(role)
    })
  }

  return isAuthorized
}

export const setValuesUserLocalStorage = (user: IUsers) => {
  const valuesUser = JSON.stringify(user)
  localStorage.setItem(userLocalStorage, valuesUser)
}

export const getCurrentUser = () => {
  let user = {} as IUsers
  const getUser = localStorage.getItem(userLocalStorage)

  if (getUser) {
    user = JSON.parse(getUser) as IUsers
  }

  return user
}

export const setTokenAuthorized = (tokenUser: string) => {
  localStorage.setItem(tokenAuth, tokenUser)
}

export const getTokenAuthorized = () => {
  let token = ''
  const tokenUser = localStorage.getItem(tokenAuth)

  console.log('tokenUser ', tokenUser)
  console.log('tokenUser ', typeof tokenUser)

  if (tokenUser) {
    token = tokenUser
  }

  return token
}

export const buildLinkFile = <T, K extends keyof T>(value: T, key: K) => {
  return URL_FILES.concat('/') + value[key]
}
