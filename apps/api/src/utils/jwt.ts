import jwt from 'jsonwebtoken'
import { env } from '../config/env'
import { IAuthPayload } from '../types/auth';

export const sign = (payload: IAuthPayload, expiresIn: number) => {
    return jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn });
}
export const verify = (token: string) => {
    return jwt.verify(token, env.JWT_ACCESS_SECRET) as IAuthPayload;
}
