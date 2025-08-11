import { Schema, model, InferSchemaType } from 'mongoose'

const UserSchema = new Schema({
  email: { type: String, unique: true, index: true },
  password: String,
  role: { type: String, enum: ['admin','customer'], default: 'customer', index: true },
  firstName: String,
  lastName: String,
  phone: String,
  emailVerifiedAt: Date,
  emailVerifyToken: String,
  emailVerifyTokenExp: Date,
  resetToken: String,
  resetTokenExp: Date,
}, { timestamps: true })

export type IUser = InferSchemaType<typeof UserSchema>

export default model<IUser>('User', UserSchema)
