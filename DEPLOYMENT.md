# SMART-CAO Deployment Guide

## Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Git
- PostgreSQL CLI
- Arbitrum testnet/mainnet RPC URL

## Environment Setup

### 1. Clone Repository
```bash
git clone https://github.com/ericoilobao/SMART-CAO.git
cd SMART-CAO
```

### 2. Install Dependencies

**Frontend**:
```bash
cd frontend
npm install
```

**Backend**:
```bash
cd backend
npm install
```

**Blockchain**:
```bash
cd blockchain
npm install
```

### 3. Environment Variables

Copy `.env.example` files and configure:

**Frontend** (`.env.local`):
```env
VITE_API_URL=http://localhost:5000/api
VITE_WALLET_ADDRESS=your_wallet_address
```

**Backend** (`.env`):
```env
DATABASE_URL=postgresql://user:password@localhost:5432/smartcao
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_secret_key
ARBITRUM_RPC_URL=https://arb1.arbitrum.io/rpc
PRIVATE_KEY=your_private_key
```

**Blockchain** (`.env`):
```env
ARBITRUM_RPC_URL=https://arb1.arbitrum.io/rpc
PRIVATE_KEY=your_private_key
ARBISCAN_API_KEY=your_key
```

## Local Development

### Start All Services with Docker Compose

```bash
docker-compose up -d
```

### Manual Start

**Terminal 1 - Backend**:
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend**:
```bash
cd frontend
npm run dev
```

**Terminal 3 - Blockchain (Testing)**:
```bash
cd blockchain
npx hardhat node
```

### Access Services
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Hardhat: http://localhost:8545

## Testing

### Run All Tests
```bash
npm run test:all
```

### Frontend Tests
```bash
cd frontend
npm run test
```

### Backend Tests
```bash
cd backend
npm run test
```

### Smart Contract Tests
```bash
cd blockchain
npm run test
```

## Deployment to Testnet

### 1. Deploy Smart Contracts to Arbitrum Sepolia

```bash
cd blockchain
npx hardhat run scripts/deploy.ts --network arbitrum-sepolia
```

**Output**:
```
✅ CABRUCA Token deployed to: 0x...
```

Save the contract address in `.env`.

### 2. Deploy Backend to Railway/Render

```bash
# Build production image
docker build -t smartcao-backend backend/

# Push to registry
docker push your-registry/smartcao-backend

# Deploy via Railway CLI
railway deploy
```

### 3. Deploy Frontend to Vercel

```bash
cd frontend
npm run build
vercel deploy --prod
```

## Production Deployment

### 1. Database Migration

```bash
cd backend
npx typeorm migration:run
```

### 2. Deploy Smart Contracts to Arbitrum Mainnet

```bash
cd blockchain

# Verify on Arbiscan first
npx hardhat verify \
  --network arbitrum \
  0xCONTRACT_ADDRESS

# Deploy
npx hardhat run scripts/deploy.ts --network arbitrum
```

### 3. Backend Deployment

Use GitHub Actions (automated on merge to `main`):

```yaml
- name: Deploy Backend
  run: railway deploy
  env:
    RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

### 4. Frontend Deployment

```bash
vercel deploy --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## Monitoring & Logging

### Backend Logs
```bash
# Local
npm run dev

# Production (Railway)
railway logs
```

### Database Monitoring
```bash
# Connect to PostgreSQL
psql $DATABASE_URL

# Check table sizes
SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) 
FROM pg_tables 
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### Smart Contract Events
```bash
cd blockchain
npx hardhat run scripts/listen-events.ts --network arbitrum
```

## Backup & Recovery

### Database Backup
```bash
pg_dump $DATABASE_URL > backup.sql
```

### Database Restore
```bash
psql $DATABASE_URL < backup.sql
```

## Security Checklist

- [ ] All environment variables configured
- [ ] JWT secret is strong and unique
- [ ] Private key is secure (not in git)
- [ ] CORS is configured properly
- [ ] Rate limiting is enabled
- [ ] SSL/HTTPS is enforced
- [ ] Smart contracts are audited
- [ ] Monitoring alerts are set up
- [ ] Backups are automated

## Troubleshooting

### Database Connection Error
```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

### Redis Connection Error
```bash
# Test Redis
redis-cli ping
```

### Contract Deployment Failed
```bash
# Check balance
ethers provider.getBalance(signerAddress)

# Check RPC connection
curl -X POST https://arb1.arbitrum.io/rpc \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'
```

## Rollback Procedure

### Backend Rollback
```bash
# Revert to previous commit
git revert HEAD

# Redeploy
railway deploy
```

### Frontend Rollback
```bash
# Vercel dashboard: Deployments > Previous version > Promote
vercel rollback
```

---

**Last Updated**: 2026-05-20
