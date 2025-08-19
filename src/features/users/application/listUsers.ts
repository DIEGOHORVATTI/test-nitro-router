import { ok, Result } from '@/core/logic/result'
import { PaginatedUsers, UserRepository } from '../domain/userRepository'

export const makeListUsers =
  (userRepository: UserRepository) =>
  async (page: number, limit: number): Promise<Result<PaginatedUsers, never>> => {
    const users = await userRepository.findAll(page, limit)

    return ok(users)
  }
