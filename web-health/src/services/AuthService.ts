import API from 'api'

import { AxiosError } from 'axios'
import { IToasterFeedback } from 'interfaces/components/ToasterFeedback'
import { IAuthUser, ILogin } from 'interfaces/pages/Login'

const API_BACKEND = process.env.URL_BACKEND || ''

export const authUser = async (params: ILogin) => {
  let auth: IAuthUser = {} as IAuthUser

  try {
    const url = API_BACKEND.concat('/auth')
    const { data } = await API.post<IAuthUser>(url, params)

    if (data) {
      auth = {
        ...data,
      }
    }

    return { auth, error: false }
  } catch (error) {
    console.error('Error function authUser => ', error)

    const err = error as AxiosError

    if (err && err.response && err.response.data) {
      auth = { ...err.response.data }
    }

    return { auth, error: true }
  }
}

export const disconnectUser = async (userId: number) => {
  let feedback: IToasterFeedback = {} as IToasterFeedback

  try {
    const url = API_BACKEND.concat('/disconnect')
    const { data } = await API.patch<IToasterFeedback>(url, userId)

    if (data) {
      feedback = {
        ...data,
      }
    }

    return { feedback, error: false }
  } catch (error) {
    console.error('Error function disconnectUser => ', error)

    const err = error as AxiosError

    if (err && err.response && err.response.data) {
      feedback = { ...err.response.data }
    }

    return { feedback, error: true }
  }
}
