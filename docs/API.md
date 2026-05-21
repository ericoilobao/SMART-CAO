# SMART-CAO API Documentation

## Base URL
```
Development: http://localhost:5000/api
Production: https://api.smartcao.com/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Endpoints

### Health Check
```http
GET /health
```
**Response**:
```json
{
  "status": "ok",
  "timestamp": "2026-05-20T10:30:00Z"
}
```

### Metrics
```http
GET /metrics
```
**Response**:
```json
{
  "tokensEmitted": 89,
  "totalValue": "250,000 USDC",
  "farmersRegistered": 25,
  "activeAlerts": 2,
  "areasMapped": 45,
  "validationQueue": 12
}
```

### Farmers

#### Register Farmer
```http
POST /farmers
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@cabruca.com",
  "walletAddress": "0x...",
  "phone": "+55 11 99999-9999"
}
```

**Response** (201):
```json
{
  "id": "uuid",
  "name": "João Silva",
  "email": "joao@cabruca.com",
  "walletAddress": "0x...",
  "createdAt": "2026-05-20T10:30:00Z"
}
```

#### Get Farmer
```http
GET /farmers/:farmerId
```

### Cabruca Areas

#### Register Area
```http
POST /areas
Content-Type: application/json
Authorization: Bearer TOKEN

{
  "farmerId": "uuid",
  "latitude": -15.8267,
  "longitude": -48.7639,
  "area": 50000,
  "carId": "CAR-123456",
  "zarcId": "ZARC-789012"
}
```

**Response** (201):
```json
{
  "id": "uuid",
  "farmerId": "uuid",
  "coordinates": {
    "latitude": -15.8267,
    "longitude": -48.7639
  },
  "area": 50000,
  "carId": "CAR-123456",
  "createdAt": "2026-05-20T10:30:00Z"
}
```

#### Get Area Details
```http
GET /areas/:areaId
```

### Tokens

#### Mint Token
```http
POST /tokens/mint
Content-Type: application/json
Authorization: Bearer TOKEN

{
  "farmerId": "uuid",
  "areaId": "uuid",
  "carbonCredit": 45.5,
  "biodiversityScore": 85,
  "uri": "ipfs://QmXxxx..."
}
```

**Response** (201):
```json
{
  "tokenId": 89,
  "transactionHash": "0x...",
  "farmerId": "uuid",
  "carbonCredit": 45.5,
  "biodiversityScore": 85,
  "status": "minting",
  "createdAt": "2026-05-20T10:30:00Z"
}
```

#### Get Token Details
```http
GET /tokens/:tokenId
```

**Response**:
```json
{
  "tokenId": 89,
  "farmerId": "uuid",
  "location": "-15.8267, -48.7639",
  "area": 50000,
  "carbonCredit": 45.5,
  "biodiversityScore": 85,
  "validated": true,
  "validationHash": "Qm...",
  "blockchainAddress": "0x...",
  "createdAt": "2026-05-20T10:30:00Z"
}
```

#### List Farmer Tokens
```http
GET /tokens/farmer/:farmerId
```

### Validation

#### Get Validation Queue
```http
GET /validations/queue
```

**Response**:
```json
[
  {
    "tokenId": 89,
    "farmerId": "uuid",
    "status": "pending",
    "visionAiResult": {
      "confidence": 0.95,
      "cabrucaDensity": "Media"
    },
    "createdAt": "2026-05-20T10:30:00Z"
  }
]
```

#### Validate Token
```http
POST /validations/:tokenId/approve
Content-Type: application/json
Authorization: Bearer TOKEN

{
  "auditorId": "uuid",
  "validationHash": "Qm...",
  "notes": "Approved after satellite image verification"
}
```

**Response** (200):
```json
{
  "tokenId": 89,
  "status": "validated",
  "validationHash": "Qm...",
  "approvedAt": "2026-05-20T10:30:00Z"
}
```

#### Reject Token
```http
POST /validations/:tokenId/reject
Content-Type: application/json
Authorization: Bearer TOKEN

{
  "auditorId": "uuid",
  "reason": "Coordinates outside CAR polygon"
}
```

### Emergency

#### Activate Circuit Breaker
```http
POST /emergency/circuit-breaker
Authorization: Bearer TOKEN
```

**Response** (200):
```json
{
  "status": "Circuit breaker activated",
  "blockingAllOperations": true
}
```

#### Reset Circuit Breaker
```http
POST /emergency/reset
Authorization: Bearer TOKEN
```

## Error Responses

### 400 - Bad Request
```json
{
  "error": "Invalid request parameters",
  "details": {
    "field": "latitude",
    "message": "Must be between -90 and 90"
  }
}
```

### 401 - Unauthorized
```json
{
  "error": "Invalid or expired token"
}
```

### 403 - Forbidden
```json
{
  "error": "Insufficient permissions"
}
```

### 404 - Not Found
```json
{
  "error": "Resource not found",
  "id": "uuid"
}
```

### 500 - Internal Server Error
```json
{
  "error": "Internal server error",
  "requestId": "abc123"
}
```

## Rate Limiting

- **Limit**: 100 requests per minute per IP
- **Headers**:
  - `X-RateLimit-Limit: 100`
  - `X-RateLimit-Remaining: 85`
  - `X-RateLimit-Reset: 1643120000`

## Pagination

```http
GET /tokens?page=1&limit=20&sort=createdAt&order=desc
```

**Response**:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

---

**Last Updated**: 2026-05-20
