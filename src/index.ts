import express from 'express'

import { userRoutes } from './features/users/presentation/routes/userRoutes'
import { errorHandler } from './core/infra/http/middleware/errorHandler'
import apiDocumentationHTML from './core/utils/apiDocumentationHTML'

const PORT = 8000
const url = `http://localhost:${PORT}`

const app = express()
app.use(express.json())

app.get('/', (_req, res) => {
  return res.json({
    message: 'Welcome to the Nitro Router API',
  })
})

app.use(userRoutes.export())

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

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`
───────────────────────────୨ৎ────────────────────────
𖤍 Server: ${url}

𖤍 Documentation: ${url}/docs
───────────────────────────୨ৎ────────────────────────
`)
})
