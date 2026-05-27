import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { Pool } from 'pg'
import { createClient } from 'redis'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// Redis connection
const redis = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
})

redis.on('error', (err) => console.error('Redis error:', err))

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.get('/api/metrics', async (req, res) => {
  try {
    const metrics = {
      tokensEmitted: 89,
      totalValue: '250,000 USDC',
      farmersRegistered: 25,
      activeAlerts: 2,
      areasMapped: 45,
      validationQueue: 12,
    }
    res.json(metrics)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch metrics' })
  }
})

// Emergency endpoints
app.post('/api/emergency/circuit-breaker', async (req, res) => {
  try {
    await redis.set('circuit-breaker', 'active', { EX: 3600 })
    console.log('⚠️ CIRCUIT BREAKER ACTIVATED')
    res.json({ status: 'Circuit breaker activated' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to activate circuit breaker' })
  }
})

app.post('/api/emergency/reset', async (req, res) => {
  try {
    await redis.del('circuit-breaker')
    console.log('✅ CIRCUIT BREAKER DEACTIVATED')
    res.json({ status: 'Circuit breaker deactivated' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to reset circuit breaker' })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 SMART-CAO Backend running on http://localhost:${PORT}`)
  console.log(`📊 API available at http://localhost:${PORT}/api`)
})

export default app
