import { Router } from 'express'
import Category from './model'
import { requireAuth } from '../../middleware/auth'
import { validate } from '../../middleware/validate'
import { createCategorySchema } from './schemas'

export const router = Router()

router.get('/', async (_req, res) => {
  const items = await Category.find({ isActive: true }).sort({ sortOrder: 1 })

  res.json({
    success: true,
    data: items
  })
})

router.post('/', requireAuth(['admin']), validate(createCategorySchema), async (req, res) => {
  const item = await Category.create(req.body)

  res.json({
    success: true,
    data: item
  })
})
