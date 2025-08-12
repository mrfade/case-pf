import { Router } from 'express'
import { router as auth } from './modules/auth/routes'
import { router as categories } from './modules/categories/routes'
import { router as products } from './modules/products/routes'

export const router = Router()

router.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

router.use('/auth', auth)
router.use('/categories', categories)
router.use('/products', products)
