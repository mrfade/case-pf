import { InferSchemaType, Schema, model } from 'mongoose'

const CategorySchema = new Schema({
  name: { type: String, unique: true },
  description: String,
  image: String,
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 }
}, { timestamps: true })

export type ICategory = InferSchemaType<typeof CategorySchema>

export default model<ICategory>('Category', CategorySchema)
