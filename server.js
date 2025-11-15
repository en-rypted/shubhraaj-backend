import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import adminRoutes from './routes/adminRoutes.js'
import siteDataRoutes from './routes/siteDataRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

const app = express()

// CORS
// const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5174'
// app.use(cors({ origin: allowedOrigin, credentials: true }))

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5174";

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // mobile/Insomnia/Postman
      if (origin === allowedOrigin) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
    methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);

// IMPORTANT for OPTIONS preflight (Vercel always sends this)
app.options("*", cors());


// Middleware
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'))

// Routes
app.use('/api/admin', adminRoutes)
app.use('/api', siteDataRoutes)

// Health
app.get('/health', (req, res) => res.json({ ok: true }))

// 404 and errors
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => {
    console.error('Failed to connect DB', err)
    process.exit(1)
  })
