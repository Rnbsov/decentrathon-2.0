import xior, { XiorRequestConfig } from 'xior'

const options: XiorRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5002/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
}

export const xiorClassic = xior.create(options)
