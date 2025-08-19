import { Result, err, ok } from '@/core/logic/result'
import { conflict } from '@/core/infra/http/errors/apiError'
import { HttpError } from '@/core/infra/http/errors/httpError'

import { User, createUser } from '../domain/user'
import { UserRepository } from '../domain/userRepository'

export const makeCreateUser =
  (userRepository: UserRepository) =>
  async (data: { name: string; email: string }): Promise<Result<User, HttpError>> => {
    const existingUser = await userRepository.findByEmail(data.email)

    if (existingUser) {
      return err(conflict('User with this email already exists.'))
    }

    const user = createUser(data)

    await userRepository.save(user)

    return ok(user)
  }
