import { User } from './user'

export type PaginatedUsers = {
  users: User[]
  total: number
  page: number
  limit: number
}

export type UserRepository = {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findAll(page: number, limit: number): Promise<PaginatedUsers>
  save(user: User): Promise<void>
}
