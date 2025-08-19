import { StatusCodes, getReasonPhrase } from 'http-status-codes'

export interface HttpErrorDetails {
  code: keyof typeof StatusCodes
  message: string
  details?: string
}

export class HttpError extends Error {
  status: number
  details?: string

  constructor({ code, message, details }: HttpErrorDetails) {
    super(message)
    const status = StatusCodes[code]
    this.name = getReasonPhrase(status)
    this.status = status
    this.details = details
    this.stack = details
  }
}

export const constError = (code: keyof typeof StatusCodes, error: string, details?: string) =>
  new HttpError({ code, message: error, details })
