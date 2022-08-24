import axios, { AxiosInstance } from 'axios'

const apiBase = 'http://non-existing-domain'

const apiClient: AxiosInstance = axios.create({
  baseURL: apiBase,
  withCredentials: true,
  timeout: 0,
})

export default apiClient