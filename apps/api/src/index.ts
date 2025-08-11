import express from 'express'
import { env } from './config/env'
import { router as api } from './routes'

const app = express()

app.use('/api', api)

app.listen(env.PORT, () => console.log(`API on http://localhost:${env.PORT}`))
