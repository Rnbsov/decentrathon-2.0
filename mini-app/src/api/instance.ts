import xior, { XiorRequestConfig } from 'xior'

const options: XiorRequestConfig = {
  baseURL: 'http://localhost:5200/api', // TODO: extract to env
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include'
}

export const xiorClassic = xior.create(options)
