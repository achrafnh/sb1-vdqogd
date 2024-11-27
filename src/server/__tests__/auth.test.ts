import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import app, { startServer, stopServer } from '../index';
import db from '../../utils/db';
import { getRandomPort } from '../utils/testing';

describe('Auth API Endpoints', () => {
  let server: any;
  let port: number;

  beforeEach(async () => {
    // Initialize a fresh database instance
    db.initializeDatabase();
    
    // Get a random port for this test
    port = await getRandomPort();
    
    // Start the server on the random port
    server = await startServer(port);
  });

  afterEach(async () => {
    // Clean up
    await stopServer();
    db.clearDatabase();
    db.closeDatabase();
  });

  describe('POST /api/auth/signup', () => {
    it('should create a new user account', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User',
          role: 'user'
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('email', 'test@example.com');
      expect(res.body.user).toHaveProperty('name', 'Test User');
      expect(res.body.user).toHaveProperty('role', 'user');
    });

    it('should create a lawyer account with profile', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'lawyer@example.com',
          password: 'password123',
          name: 'Test Lawyer',
          role: 'lawyer'
        });

      expect(res.status).toBe(200);
      expect(res.body.user).toHaveProperty('role', 'lawyer');
      
      const lawyers = db.getLawyers();
      const lawyerProfile = lawyers.findOne({ userId: res.body.user.id });
      expect(lawyerProfile).toBeTruthy();
    });
  });
});