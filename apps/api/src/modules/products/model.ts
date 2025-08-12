import { Schema, model, Types, InferSchemaType } from 'mongoose'

const VariantSchema = new Schema({
  sku: String,
  size: String,
  color: String,
  stock: Number,
  priceDelta: Number
}, { _id: false })

const ImageSchema = new Schema({
  url: String,
  alt: String
}, { _id: false })

const ProductSchema = new Schema({
  name: String,
  slug: { type: String, unique: true },
  description: String,
  price: Number,
  category: { type: Types.ObjectId, ref: 'Category' },
  images: [ImageSchema],
  specs: { type: Map, of: String },
  tags: [String],
  isFeatured: Boolean,
  variants: [VariantSchema],
  avgRating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 }
}, { timestamps: true })

ProductSchema.index({ name: 'text', description: 'text', tags: 'text' })

export type IProduct = InferSchemaType<typeof ProductSchema>

export default model<IProduct>('Product', ProductSchema)
