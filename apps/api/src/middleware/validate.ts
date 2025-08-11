import { z, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';

export function validate(schema: z.ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        console.error(err);
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: err.issues.map(e => ({
            path: e.path.join("."),
            message: e.message
          }))
        });
      }
    }
  };
}
