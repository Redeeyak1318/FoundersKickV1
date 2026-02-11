import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import passport from 'passport'
import { loadEnv } from './config/env.js'
import { errorHandler, notFound } from './middleware/error.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import startupRoutes from './routes/startups.js'
import postRoutes from './routes/posts.js'
import opportunityRoutes from './routes/opportunities.js'
import eventRoutes from './routes/events.js'
import './config/passport.js'

loadEnv()

const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.json({ limit: '1mb' }))
app.use(morgan('dev'))
app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false
  })
)
app.use(passport.initialize())

app.get('/health', (req, res) => res.json({ ok: true }))

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/startups', startupRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/opportunities', opportunityRoutes)
app.use('/api/events', eventRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
