import { NextFunction, Request, Response } from 'express'
import { HttpError } from '../errors/httpError'
import z from 'zod'

export default function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      error: [err.message || 'Internal Server Error'],
    })
  }

  if (err instanceof z.ZodError) {
    return res.status(400).json({
      error: err.issues.map((issue) => issue.message) || ['Validation Error'],
    })
  }

  return res.status(500).json({
    error: [err.message || 'Internal Server Error'],
  })
}
