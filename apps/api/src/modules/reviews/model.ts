import { Schema, model, Types, InferSchemaType } from 'mongoose'

const ReviewSchema = new Schema({
  product: { type: Types.ObjectId, ref: 'Product' },
  user: { type: Types.ObjectId, ref: 'User' },
  rating: Number,
  comment: String,
  status: { type: String, enum: ['pending','approved','rejected'], default: 'pending' }
}, { timestamps: true })

ReviewSchema.index({ product: 1, user: 1 }, { unique: true })

export type IReview = InferSchemaType<typeof ReviewSchema>

export default model<IReview>('Review', ReviewSchema)
