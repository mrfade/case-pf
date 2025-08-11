import { JwtPayload } from 'jsonwebtoken';

export interface IAuthPayload extends JwtPayload {
  role: string
}
