export type Ok<T> = {
  ok: true
  value: T
}

export type Err<E> = {
  ok: false
  error: E
}

export type Result<T, E> = Ok<T> | Err<E>

export const ok = <T>(value: T): Result<T, never> => ({ ok: true, value })
export const err = <E>(error: E): Result<never, E> => ({ ok: false, error })

export const match = <T, E, R>(
  result: Result<T, E>,
  handlers: { ok: (value: T) => R; err: (error: E) => R }
): R => {
  if (result.ok) {
    return handlers.ok(result.value)
  }
  return handlers.err(result.error)
}
