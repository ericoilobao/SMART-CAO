import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Farmers Routes
app.get('/api/farmers', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: [
      { id: 1, name: 'João Silva', email: 'joao@example.com', area: 12.5, status: 'active' },
      { id: 2, name: 'Maria Santos', email: 'maria@example.com', area: 8.3, status: 'active' },
      { id: 3, name: 'Pedro Oliveira', email: 'pedro@example.com', area: 15.2, status: 'pending' }
    ]
  })
})

app.post('/api/farmers', (req: Request, res: Response) => {
  const { name, email, area } = req.body
  res.status(201).json({
    success: true,
    data: { id: 4, name, email, area, status: 'pending' }
  })
})

// Tokens Routes
app.get('/api/tokens', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: [
      { id: 'CAB-089', farmerId: 1, area: 12.5, status: 'validated', type: 'Cabruca Media' },
      { id: 'CAB-088', farmerId: 2, area: 8.3, status: 'pending', type: 'Cabruca Densa' },
      { id: 'CAB-087', farmerId: 3, area: 15.2, status: 'validated', type: 'Cabruca Media' }
    ]
  })
})

// Validation Routes
app.get('/api/validations', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: [
      { id: 'VAL-001', tokenId: 'CAB-090', score: 89, status: 'ready', auditor: 'Prof. Eduardo Palmeira' },
      { id: 'VAL-002', tokenId: 'CAB-089', score: 45, status: 'pending', auditor: 'Prof. Eduardo Palmeira' }
    ]
  })
})

app.post('/api/validations/:tokenId/approve', (req: Request, res: Response) => {
  const { tokenId } = req.params
  res.json({
    success: true,
    message: `Token ${tokenId} approved successfully`,
    data: { tokenId, status: 'validated' }
  })
})

// Circuit Breaker Routes
app.get('/api/circuit-breaker/status', (req: Request, res: Response) => {
  res.json({ active: false, timestamp: new Date().toISOString() })
})

app.post('/api/circuit-breaker/activate', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Circuit breaker activated',
    active: true,
    auditor: 'Prof. Eduardo Palmeira'
  })
})

app.post('/api/circuit-breaker/deactivate', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Circuit breaker deactivated',
    active: false
  })
})

// Error handling
app.use((err: any, req: Request, res: Response) => {
  console.error(err)
  res.status(500).json({ error: 'Internal Server Error' })
})

app.listen(PORT, () => {
  console.log(`🚀 SMART-CAO Backend running on port ${PORT}`)
})
