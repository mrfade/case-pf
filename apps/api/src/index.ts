import express from 'express'
import mongoose from 'mongoose'
import { env } from './config/env'
import { router as api } from './routes'

const app = express()
app.use(express.json())

app.use('/api', api)

mongoose.connect(env.MONGO_URI).then(() => {
  app.listen(env.PORT, () => console.log(`API on http://localhost:${env.PORT}`))
})
