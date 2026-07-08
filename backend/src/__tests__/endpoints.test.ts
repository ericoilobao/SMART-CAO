import request from 'supertest';
import { describe, it, expect } from '@jest/globals';

describe('API Endpoints Tests', () => {
  let app: any;
  const baseUrl = process.env.API_URL || 'http://localhost:5000/api';

  describe('Health Check', () => {
    it('GET /health should return 200', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('Users Endpoints', () => {
    it('GET /api/users should return users list', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(200);

      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('GET /api/users/:id should return user', async () => {
      const response = await request(app)
        .get('/api/users/1')
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('email');
    });
  });

  describe('Cabruca Areas Endpoints', () => {
    it('GET /api/cabruca should return areas list', async () => {
      const response = await request(app)
        .get('/api/cabruca')
        .expect(200);

      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('POST /api/cabruca should create new area', async () => {
      const newArea = {
        location: 'Bahia, Brazil',
        areaSize: 100,
        coordinates: {
          lat: -15.7942,
          lng: -52.4697,
        },
        ownerWallet: '0x1234567890123456789012345678901234567890',
      };

      const response = await request(app)
        .post('/api/cabruca')
        .send(newArea)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.location).toBe(newArea.location);
    });
  });

  describe('NFT Endpoints', () => {
    it('GET /api/nft should return NFTs list', async () => {
      const response = await request(app)
        .get('/api/nft')
        .expect(200);

      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('POST /api/nft/mint should create NFT', async () => {
      const nftData = {
        cabrukaId: 1,
        tokenURI: 'ipfs://QmTest...',
        metadata: {
          name: 'CABRUCA-001',
          description: 'Cabruca area tokenized',
          image: 'ipfs://QmImage...',
        },
      };

      const response = await request(app)
        .post('/api/nft/mint')
        .send(nftData)
        .expect(201);

      expect(response.body).toHaveProperty('tokenId');
      expect(response.body).toHaveProperty('transactionHash');
    });
  });

  describe('Validation & Error Handling', () => {
    it('should return 400 for invalid request', async () => {
      const response = await request(app)
        .post('/api/cabruca')
        .send({ invalid: 'data' })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should return 404 for non-existent resource', async () => {
      const response = await request(app)
        .get('/api/users/999999')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });

    it('should return 500 with error details', async () => {
      const response = await request(app)
        .get('/api/invalid-endpoint')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Rate Limiting', () => {
    it('should enforce rate limits', async () => {
      // Make multiple rapid requests
      for (let i = 0; i < 100; i++) {
        await request(app).get('/api/health');
      }

      const response = await request(app)
        .get('/api/health')
        .expect(429); // Too Many Requests

      expect(response.body).toHaveProperty('error');
    });
  });
});
