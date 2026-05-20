# SMART-CAO 🌱

**Tokenizing Cabruca — A Natural Climate Asset**

SMART-CAO é uma plataforma blockchain para tokenização de áreas de Cabruca (agroflorestas brasileiras), permitindo que pequenos agricultores acessem mercados de carbono e biodiversidade de forma segura e transparente.

## 🎯 Objetivo

Integrar tecnologia verde com ativos ambientais sustentáveis através de:
- **Tokenização**: Conversão de áreas Cabruca em NFTs (CAB-T tokens)
- **Validação**: Uso de IA (Roboflow) + satélite para auditoria
- **Blockchain**: Smart contracts em Arbitrum para transparência
- **Marketplace**: Conexão B2B com mercados de carbono e biodiversidade

## 📋 Tech Stack

### Frontend
- **React 18** + TypeScript
- **Vite** para build rápido
- **Tailwind CSS** para styling
- **Web3.js** para integração blockchain
- **Zustand** para state management

### Backend
- **Node.js** + Express
- **PostgreSQL** para dados
- **JWT** para autenticação
- **Redis** para cache
- **Multer** para upload de imagens

### Blockchain
- **Solidity** para smart contracts
- **Hardhat** para desenvolvimento
- **Arbitrum One** como rede principal
- **OpenZeppelin** para padrões ERC-721 (NFT)

## 🚀 Roadmap

### Fase 1 (2025) - Beta
- [ ] Mapeamento de áreas piloto
- [ ] Emissão de CABRUCA tokens e NFTs
- [ ] Hub Operacional (Centro de Comando)
- [ ] Validação via Vision API

### Fase 2 (2026) - Expansão
- [ ] Certificações com marketplace
- [ ] Integração com mercados verdes
- [ ] Financiamento ESG

### Fase 3 (2027) - Conversão
- [ ] Conversão nacional
- [ ] Emissão CABU (CABRUCA digital)

### Fase 4 (2028+) - Escalabilidade
- [ ] Financiamento internacional
- [ ] Investimentos ESG

## 📁 Estrutura do Projeto

```
SMART-CAO/
├── frontend/                 # Aplicação React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── App.tsx
│   └── package.json
├── backend/                  # API Node.js
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── middleware/
│   └── package.json
├── blockchain/               # Smart Contracts
│   ├── contracts/
│   │   ├── CABRUCAToken.sol
│   │   └── Marketplace.sol
│   ├── scripts/
│   ├── test/
│   └── hardhat.config.js
├── docs/                     # Documentação
│   ├── ARCHITECTURE.md
│   ├── API.md
│   └── DEPLOYMENT.md
└── .github/                  # GitHub Actions
    └── workflows/
        └── ci.yml
```

## 🛠️ Instalação

### Pré-requisitos
- Node.js 18+
- Git
- Metamask ou carteira Web3

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

### Blockchain
```bash
cd blockchain
npm install
npx hardhat compile
npx hardhat test
```

## 📚 Documentação

- [Arquitetura](./docs/ARCHITECTURE.md)
- [API Reference](./docs/API.md)
- [Smart Contracts](./docs/SMART_CONTRACTS.md)
- [Deployment](./docs/DEPLOYMENT.md)

## 🔐 Segurança

- Smart contracts auditados
- JWT para autenticação
- CORS configurado
- Rate limiting implementado
- Validação de entrada em todos endpoints

## 👥 Time

**Governança e Equipe Técnica**
- **ALCASOL**: Inovação, pesquisa e gestão do sistema
- **FUNPAB**: Estratégia e parceria com conservacionistas

## 📞 Contato

- **Website**: [em breve]
- **Email**: contact@smartcao.com
- **Discord**: [link]

## 📄 Licença

MIT License - veja [LICENSE](./LICENSE) para detalhes

---

**Versão**: 0.1.0 (Beta)  
**Última atualização**: 2026-05-20
