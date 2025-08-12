import { Request, Response, NextFunction } from 'express'
import { env } from '../config/env'
import { verify } from '../utils/jwt'

export const requireAuth = (roles?: string[]) => (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const token = header.split(' ')[1]
    const payload = verify(token)

    ;(req as any).userId = payload.sub
  
    if (roles && !roles.includes(payload.role)) {
      return res.status(403).json({ message: 'Forbidden' })
    }
  
    next()
  } catch {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
