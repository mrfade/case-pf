import { Router } from 'express'
import bcrypt from '@node-rs/bcrypt'
import User from '../user/model'
import { validate } from '../../middleware/validate'
import { loginSchema, registerSchema } from './schemas'
import { sign } from '../../utils/jwt'

export const router = Router()

router.post('/register', validate(registerSchema), async (req, res) => {
  const { email, password, firstName, lastName } = req.body

  const exists = await User.findOne({ email })
  if (exists) {
    return res.status(409).json({ message: 'User already registered' })
  }

  const hash = await bcrypt.hash(password, 10)

  const user = await User.create({
    email,
    password: hash,
    firstName,
    lastName,
    role: 'customer'
  })

  const accessToken = sign({ sub: user.email!, role: user.role! }, 3600)

  return res.json({
    success: true,
    data: {
      ...user.toObject(),
      accessToken
    }
  })
})

router.post('/login', validate(loginSchema), async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const ok = await bcrypt.compare(password, user.password || '')
  if (!ok) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const accessToken = sign({ sub: user.email!, role: user.role! }, 3600)

  res.json({
    success: true,
    data: {
      ...user.toObject(),
      accessToken
    }
  })
})
