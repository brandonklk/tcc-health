import API from 'api'

import { AxiosError } from 'axios'
import { IToasterFeedback } from 'interfaces/components/ToasterFeedback'
import { IDetailsProcedures, IMedProcedures } from 'interfaces/pages/Documents'

const API_BACKEND = process.env.URL_BACKEND || ''

export const getProceduresUser = async (userId: number) => {
  let procedures: IMedProcedures[] = []
  let feedback: IToasterFeedback = {} as IToasterFeedback

  try {
    const url = API_BACKEND.concat(`/get-procedures-user/${userId}`)
    const { data } = await API.get<IMedProcedures[]>(url)

    if (data) {
      procedures = data
    }

    return { procedures, feedback, error: false }
  } catch (error) {
    console.error('Error function getProceduresUser => ', error)

    const err = error as AxiosError

    if (err && err.response && err.response.data) {
      feedback = { ...err.response.data }
    }

    return { procedures, feedback, error: true }
  }
}

export const getDetailsProcedure = async (procedureId: number) => {
  let detailsProcedure: IDetailsProcedures = {} as IDetailsProcedures
  let feedback: IToasterFeedback = {} as IToasterFeedback

  try {
    const url = API_BACKEND.concat(`/get-procedure-user/${procedureId}`)
    const { data } = await API.get<IDetailsProcedures>(url)

    if (data) {
      detailsProcedure = data
    }

    return { detailsProcedure, feedback, error: false }
  } catch (error) {
    console.error('Error function getProceduresUser => ', error)

    const err = error as AxiosError

    if (err && err.response && err.response.data) {
      feedback = { ...err.response.data }
    }

    return { detailsProcedure, feedback, error: true }
  }
}

export const saveProcedure = async (procedures: FormData) => {
  let feedback: IToasterFeedback = {} as IToasterFeedback

  try {
    const url = API_BACKEND.concat(`/save-procedure`)
    const { data } = await API.post<IToasterFeedback>(url, procedures, {
      headers: { 'content-type': 'multipart/form-data' },
    })

    if (data) {
      feedback = { ...data }
    }

    return { feedback, error: false }
  } catch (error) {
    console.error('Error function saveProcedure => ', error)

    const err = error as AxiosError

    if (err && err.response && err.response.data) {
      feedback = { ...err.response.data }
    }

    return { feedback, error: true }
  }
}

export const deleteProcedure = async (procedureId: number) => {
  let feedback: IToasterFeedback = {} as IToasterFeedback

  try {
    const url = API_BACKEND.concat(`/delete-procedure/${procedureId}`)
    const { data } = await API.delete<IToasterFeedback>(url)

    if (data) {
      feedback = { ...data }
    }

    return { feedback, error: false }
  } catch (error) {
    console.error('Error function deleteProcedure => ', error)

    const err = error as AxiosError

    if (err && err.response && err.response.data) {
      feedback = { ...err.response.data }
    }

    return { feedback, error: true }
  }
}

export const editProcedure = async (procedure: IMedProcedures) => {
  let feedback: IToasterFeedback = {} as IToasterFeedback

  try {
    const url = API_BACKEND.concat(`/edit-procedure`)
    const { data } = await API.patch<IToasterFeedback>(url, procedure)

    if (data) {
      feedback = { ...data }
    }

    return { feedback, error: false }
  } catch (error) {
    console.error('Error function editProcedure => ', error)

    const err = error as AxiosError

    if (err && err.response && err.response.data) {
      feedback = { ...err.response.data }
    }

    return { feedback, error: true }
  }
}
