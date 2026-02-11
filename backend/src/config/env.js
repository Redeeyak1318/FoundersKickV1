import dotenv from 'dotenv'

export const loadEnv = () => {
  dotenv.config()
  if (!process.env.JWT_SECRET) {
    console.warn('JWT_SECRET is not set')
  }
}
