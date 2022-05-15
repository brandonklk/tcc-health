import axios from 'axios'
import { getTokenAuthorized } from 'utils'

const API = axios.create({
  baseURL: process.env.REACT_APP_URL_BACKEND,
  headers: { Authorization: getTokenAuthorized() },
})

export default API
