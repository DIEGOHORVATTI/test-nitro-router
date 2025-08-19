import { User } from '../domain/user'
import { PaginatedUsers, UserRepository } from '../domain/userRepository'

const users: User[] = []

export const userRepositoryImpl: UserRepository = {
  async findById(id: string): Promise<User | null> {
    return users.find((user) => user.id === id) || null
  },

  async findByEmail(email: string): Promise<User | null> {
    return users.find((user) => user.props.email === email) || null
  },

  async findAll(page: number, limit: number): Promise<PaginatedUsers> {
    const start = (page - 1) * limit
    const end = page * limit
    const paginatedUsers = users.slice(start, end)

    return {
      users: paginatedUsers,
      total: users.length,
      page,
      limit,
    }
  },

  async save(user: User): Promise<void> {
    const index = users.findIndex((u) => u.id === user.id)
    if (index !== -1) {
      users[index] = user
    } else {
      users.push(user)
    }
  },
}
