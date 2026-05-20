# SMART-CAO - Arquitetura do Sistema

## 🏗️ Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (React)                        │
│         Dashboard | Hub Operacional | Carteira Web3          │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP REST API
┌────────────────────────▼────────────────────────────────────┐
│                  BACKEND (Node.js/Express)                   │
│  Farmers | Tokens | Validations | Circuit Breaker | Auth    │
└────────────┬──────────────┬──────────────┬───────────────────┘
             │              │              │
        ┌────▼──────┐  ┌────▼──────┐  ┌───▼────────┐
        │ PostgreSQL│  │   Redis   │  │ Vision API │
        │  Database │  │  (Cache)  │  │    (IA)    │
        └───────────┘  └───────────┘  └────────────┘
                         │
        ┌────────────────▼────────────────┐
        │   BLOCKCHAIN (Arbitrum)         │
        │  Smart Contracts (ERC-721 NFT) │
        └────────────────────────────────┘
```

## 📦 Camadas da Aplicação

### 1. **Frontend (React + TypeScript + Vite)**
- **Componentes**:
  - `App.tsx` - Aplicação principal com navegação
  - `Dashboard.tsx` - Painel de controle com KPIs
  - `HubOperacional.tsx` - Centro de comando com Circuit Breaker
  - `WalletConnection.tsx` - Integração com MetaMask
  
- **Estado**: Zustand para gerenciamento
- **Web3**: Web3.js para comunicação com blockchain
- **UI**: Tailwind CSS + Lucide Icons

### 2. **Backend API (Node.js + Express)**
- **Rotas Principais**:
  ```
  GET/POST   /api/farmers           - Gerenciar agricultores
  GET/POST   /api/tokens            - Gerenciar tokens CAB-T
  GET/POST   /api/validations       - Fila de validação
  POST       /api/circuit-breaker/*  - Controle emergencial
  GET        /api/health            - Health check
  ```

- **Autenticação**: JWT
- **Validação**: Middleware de entrada
- **CORS**: Configurado para frontend

### 3. **Banco de Dados**
- **PostgreSQL**: Dados persistentes
  - `farmers` - Agricultores registrados
  - `tokens` - Metadados dos tokens
  - `validations` - Histórico de validações
  - `alerts` - Alertas de conformidade

- **Redis**: Cache e controle emergencial
  - Circuit breaker status
  - Sessões de usuário
  - Rate limiting

### 4. **Vision API Integration**
- Validação de imagens via Google Cloud Vision
- Reconhecimento de padrões Cabruca
- Score de confiança (0-100)
- Integração com fila de validação

### 5. **Blockchain (Arbitrum)**
- **Smart Contract**: `CABRUCAToken.sol` (ERC-721)
  - Minting de NFTs
  - Validação on-chain
  - Certificação com expiração
  - Burning de tokens

- **Rede**: Arbitrum One (mainnet) / Arbitrum Sepolia (testnet)
- **Validadores**: Endereços autorizados para validação

## 🔄 Fluxo de Dados

### Emissão de Token (Farmer Journey)
```
1. Farmer submete área via Frontend
   ↓
2. Backend valida dados e cria registro
   ↓
3. Imagem enviada para Vision API
   ↓
4. IA retorna score de validação
   ↓
5. Hub Operacional revisa (Prof. Eduardo Palmeira)
   ↓
6. Smart Contract minta NFT se aprovado
   ↓
7. Frontend exibe token emitido ao farmer
```

### Circuit Breaker (Emergência)
```
Auditor detecta problema
   ↓
Clica em "ATIVAR CIRCUIT BREAKER"
   ↓
Backend bloqueia Redis (flag)
   ↓
Todas as emissões pausadas
   ↓
Auditores investigam
   ↓
Desativar Circuit Breaker após resolver
```

## 🔐 Segurança

- **Smart Contracts**: Auditados com Hardhat
- **JWT**: Tokens com expiração
- **Rate Limiting**: 100 req/min por IP
- **CORS**: Apenas domínios autorizados
- **Validação**: Todos endpoints validam entrada
- **Logs**: Auditoria completa de operações

## 🚀 Deploy

### Variáveis de Ambiente (.env)

**Frontend** (`frontend/.env`):
```
VITE_API_URL=http://localhost:5000
VITE_ARBITRUM_RPC=https://arb1.arbitrum.io/rpc
VITE_CONTRACT_ADDRESS=0x...
```

**Backend** (`backend/.env`):
```
PORT=5000
DB_HOST=localhost
DB_NAME=smartcao
REDIS_URL=redis://localhost:6379
VISION_API_KEY=...
JWT_SECRET=your_secret_key
```

**Blockchain** (`blockchain/.env`):
```
ARBITRUM_ONE_RPC_URL=https://arb1.arbitrum.io/rpc
ARBITRUM_SEPOLIA_RPC_URL=https://sepolia-rollup.arbitrum.io:443/rpc
PRIVATE_KEY=0x...
ARBISCAN_API_KEY=...
```

## 📊 Tecnologias Utilizadas

| Camada | Tech | Versão |
|--------|------|--------|
| Frontend | React | 18.2.0 |
| Build | Vite | 4.3.9 |
| Estilos | Tailwind CSS | 3.3.2 |
| Backend | Express | 4.18.2 |
| Runtime | Node.js | 18+ |
| Banco | PostgreSQL | 14+ |
| Cache | Redis | 6+ |
| Blockchain | Solidity | 0.8.0 |
| Framework SC | Hardhat | 2.14.0 |
| Chain | Arbitrum | One/Sepolia |

## 📝 Próximos Passos

- [ ] Implementar autenticação JWT completa
- [ ] Integrar Google Cloud Vision API
- [ ] Testes unitários (Jest)
- [ ] Deploy em Vercel (Frontend)
- [ ] Deploy em Railway (Backend)
- [ ] Deploy Smart Contracts em Arbitrum
- [ ] CI/CD com GitHub Actions
- [ ] Documentação OpenAPI/Swagger
