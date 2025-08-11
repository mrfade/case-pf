import { Router } from 'express'
import { router as auth } from './modules/auth/routes'

export const router = Router()

router.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

router.use('/auth', auth)
