import { NextFunction, Request, Response } from 'express'
import { HttpError } from '../errors/httpError'

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err)

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      error: err.name,
      message: err.message,
      details: err.details,
    })
  }

  // Para erros não esperados
  console.error(err)
  return res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred.',
  })
}
