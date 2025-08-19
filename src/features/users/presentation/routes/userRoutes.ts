import { NitroRouter } from 'nitro-router'
import { z } from 'zod'
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'

import { userRepositoryImpl } from '../../infrastructure/userRepositoryImpl'

import { makeCreateUser } from '../../application/createUser'
import { makeListUsers } from '../../application/listUsers'

// Extend Zod with OpenAPI functionality
extendZodWithOpenApi(z)

export const userRoutes = new NitroRouter()

const createUserSchema = z.object({
  name: z.string(),
  email: z.email(),
})

const listUsersQuerySchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
})

userRoutes.post(
  '/users',
  async ({ body }) => {
    const result = await makeCreateUser(userRepositoryImpl)(body)

    return result
  },
  {
    tags: ['Users'],
    summary: 'Criar um novo usuário',
    body: createUserSchema,
  }
)

userRoutes.get(
  '/users',
  async ({ query: { page, limit } }) => {
    const result = await makeListUsers(userRepositoryImpl)(page, limit)

    return result
  },
  {
    tags: ['Users'],
    summary: 'Listar usuários',
    query: listUsersQuerySchema,
  }
)
