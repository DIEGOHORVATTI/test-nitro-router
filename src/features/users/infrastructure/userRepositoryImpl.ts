import { User } from '../domain/user'
import { UserRepository } from '../domain/userRepository'

const users: User[] = []

export const userRepositoryImpl: UserRepository = {
  async findById(id: string): Promise<User | null> {
    return users.find((user) => user.id === id) || null
  },

  async findByEmail(email: string): Promise<User | null> {
    return users.find((user) => user.props.email === email) || null
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
