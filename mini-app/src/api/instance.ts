import xior, { XiorRequestConfig } from 'xior'

const options: XiorRequestConfig = {
  baseURL: 'http://192.168.173.72:5002/api/v1/', // TODO: extract to env
  headers: {
    'Content-Type': 'application/json'
  }
}

export const xiorClassic = xior.create(options)
