import { NitroRouter } from 'nitro-router'
import { z } from 'zod'
import { makeCreateUser } from '../../application/createUser'
import { userRepositoryImpl } from '../../infrastructure/userRepositoryImpl'

const createUserHandler = makeCreateUser(userRepositoryImpl)

export const userRoutes = new NitroRouter()

const CreateUserSchema = z.object({
  name: z.string(),
  email: z.email(),
})

userRoutes.post(
  '/users',
  async ({ body }) => {
    const result = await createUserHandler(body)

    return result
  },
  {
    body: CreateUserSchema,
    summary: 'Criar um novo usuário',
    tags: ['Users'],
  }
)
