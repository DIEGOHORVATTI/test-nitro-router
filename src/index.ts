import express from 'express'

import NR from 'nitro-router'
import apiDocumentationHTML from '@/core/utils/apiDocumentationHTML'
import errorHandler from '@/core/infra/http/middleware/errorHandler'

import { userRoutes } from '@/features/users/presentation/routes/userRoutes'

const app = express()
app.use(express.json())

const PORT = 8000
const url = `http://localhost:${PORT}`

const route = new NR()

route.get(
  '/',
  () => {
    return { message: 'Bem-vindo à API!' }
  },
  {
    summary: 'Página inicial',
    tags: ['Home'],
  }
)

// Exportar o router para o Express
app.use(route.export())
app.use(userRoutes.export())

app.use(errorHandler)

app.get('/docs', (_, res) => {
  res.send(
    apiDocumentationHTML({
      openapi: '3.0.0',
      info: {
        title: 'Minha API',
        version: '1.0.0',
        description: 'Documentação da API',
      },
      servers: [{ url, description: 'Servidor de desenvolvimento' }],
    })
  )
})

app.listen(PORT, () => {
  console.log(`
───────────────────────────୨ৎ────────────────────────
𖤍 Server: ${url}

𖤍 Documentation: ${url}/docs
───────────────────────────୨ৎ────────────────────────
`)
})
