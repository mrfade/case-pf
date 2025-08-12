import { Router } from 'express'
import Product from './model'

export const router = Router()

router.get('/', async (req, res) => {
  const sortMap: Record<string, any> = {
    price: { price: 1 },
    '-price': { price: -1 },
    rating: { avgRating: -1 },
    newest: { createdAt: -1 }
  }

  const q = req.query.q
  const category = req.query.category
  const minPrice = Number(req.query.minPrice)
  const maxPrice = Number(req.query.maxPrice)
  const sort = typeof req.query.sort === 'string' && sortMap[req.query.sort] ? req.query.sort : 'newest'
  const page = Number(req.query.page) || 1
  const pageSize = Number(req.query.pageSize) || 12

  const filter: any = {}
  if (category) {
    filter.category = category
  }

  if (minPrice || maxPrice) {
    filter.price = {
      ...(minPrice && { $gte: minPrice }),
      ...(maxPrice && { $lte: maxPrice })
    }
  }

  if (q) {
    filter.$text = { $search: q }
  }

  const skip = (page - 1) * pageSize

  const [data, total] = await Promise.all([
    Product.find(filter).sort(sortMap[sort] ?? { createdAt: -1 }).skip(skip).limit(pageSize),
    Product.countDocuments(filter)
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

router.get('/:slug', async (req, res) => {
  const item = await Product.findOne({ slug: req.params.slug })
  if (!item) {
    return res.status(404).json({ message: 'Not found' })
  }

  res.json({
    success: true,
    data: item
  })
})
