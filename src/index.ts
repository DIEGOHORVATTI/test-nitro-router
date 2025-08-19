import express from 'express'

import apiDocumentationHTML from '@/core/infra/http/shared/apiDocumentationHTML'

import { userRoutes } from '@/features/users/presentation/routes/userRoutes'
import { errorHandler } from '@/core/infra/http/middleware/errorHandler'

const app = express()
app.use(express.json())

app.use(userRoutes.export())

// Endpoint para retornar a documentação OpenAPI
app.get('/docs', (_, res) => {
  res.send(
    apiDocumentationHTML({
      openapi: '3.0.0',
      info: {
        title: 'Minha API',
        version: '1.0.0',
        description: 'Documentação da API',
      },
      servers: [{ url: 'http://localhost:3000', description: 'Servidor de desenvolvimento' }],
    })
  )
})

app.use(errorHandler)

const PORT = 8000
app.listen(PORT, () => {
  console.log(`
─────────────────────────୨ৎ────────────────────────
𖤍 Server: http://localhost:${PORT}

𖤍 Documentation: http://localhost:${PORT}/docs
─────────────────────────୨ৎ────────────────────────
`)
})
