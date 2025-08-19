import { constError } from './httpError'

export const badRequest = (error: string, details?: string) =>
  constError('BAD_REQUEST', error, details)
export const notFound = (error: string, details?: string) => constError('NOT_FOUND', error, details)
export const conflict = (error: string, details?: string) => constError('CONFLICT', error, details)
export const internal = (error: string, details?: string) =>
  constError('INTERNAL_SERVER_ERROR', error, details)
