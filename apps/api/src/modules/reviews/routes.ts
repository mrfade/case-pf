import { Router } from 'express'
import Review from './model'

export const router = Router()

router.get('/product/:id', async (req, res) => {
  const page = Number(req.query.page) || 1
  const pageSize = Number(req.query.pageSize) || 10

  const skip = (page - 1) * pageSize

  const [data, total] = await Promise.all([
    Review.find({ product: req.params.id, status: 'approved' })
      .skip(skip)
      .limit(pageSize),
    Review.countDocuments({ product: req.params.id, status: 'approved' })
  ])

  const totalPages = Math.ceil(total / pageSize)

  res.json({
    data,
    pagination: {
      page,
      pageSize,
      total,
      totalPages
    }
  })
})
