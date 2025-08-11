import 'dotenv/config'

export const env = {
  PORT: Number(process.env.PORT ?? 4000),
  MONGO_URI: process.env.MONGO_URI!,
}
