import API from 'api'
import { AxiosError } from 'axios'
import { IToasterFeedback } from 'interfaces/components/ToasterFeedback'
import { IAuthUser, IUsers } from 'interfaces/pages/Login'

const API_BACKEND = process.env.URL_BACKEND || ''

export const createUser = async (params: FormData) => {
  let feedback: IToasterFeedback = {} as IToasterFeedback

  try {
    const url = API_BACKEND.concat('/create-user')
    const { data } = await API.post<IToasterFeedback>(url, params, {
      headers: { 'content-type': 'multipart/form-data' },
    })

    if (data) {
      feedback = {
        ...data,
      }
    }

    return { feedback, error: false }
  } catch (error) {
    console.error('Error function createUser => ', error)

    const err = error as AxiosError

    if (err && err.response && err.response.data) {
      feedback = { ...err.response.data }
    }

    return { feedback, error: true }
  }
}

export const getUser = async (userId: number) => {
  let user: IUsers = {} as IUsers
  let feedback: IToasterFeedback = {} as IToasterFeedback

  try {
    const url = API_BACKEND.concat(`/get-user/${userId}`)
    const { data } = await API.get<IUsers>(url)

    if (data) {
      user = {
        ...data,
      }
    }

    return { user, feedback, error: false }
  } catch (error) {
    console.error('Error function getUser => ', error)
    const err = error as AxiosError

    if (err && err.response && err.response.data) {
      feedback = { ...err.response.data }
    }

    return { user, feedback, error: true }
  }
}

export const editUser = async (params: FormData) => {
  let user: IAuthUser = {} as IAuthUser

  try {
    const url = API_BACKEND.concat('/edit-user')
    const { data } = await API.patch<IAuthUser>(url, params, {
      headers: { 'content-type': 'multipart/form-data' },
    })

    if (data) {
      user = {
        ...data,
      }
    }

    return { user, error: false }
  } catch (error) {
    console.error('Error function editUser => ', error)

    const err = error as AxiosError

    if (err && err.response && err.response.data) {
      user = { ...err.response.data }
    }

    return { user, error: true }
  }
}
