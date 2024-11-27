import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import app, { startServer, stopServer } from '../index';
import db from '../../utils/db';
import { getRandomPort } from '../utils/testing';

describe('Lawyers API Endpoints', () => {
  let server: any;
  let port: number;

  beforeEach(async () => {
    // Initialize a fresh database instance
    db.initializeDatabase();
    
    // Get a random port for this test
    port = await getRandomPort();
    
    // Start the server on the random port
    server = await startServer(port);

    // Create test lawyers
    const lawyer1 = await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'lawyer1@example.com',
        password: 'password123',
        name: 'John Doe',
        role: 'lawyer'
      });

    const lawyer2 = await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'lawyer2@example.com',
        password: 'password123',
        name: 'Jane Smith',
        role: 'lawyer'
      });

    // Update lawyer profiles with test data
    const lawyers = db.getLawyers();
    lawyers.update({
      ...lawyers.findOne({ userId: lawyer1.body.user.id }),
      expertise: ['Criminal Law', 'Family Law'],
      location: 'New York',
      rating: 4.5
    });

    lawyers.update({
      ...lawyers.findOne({ userId: lawyer2.body.user.id }),
      expertise: ['Corporate Law', 'Real Estate Law'],
      location: 'Los Angeles',
      rating: 4.8
    });
  });

  afterEach(async () => {
    // Clean up
    await stopServer();
    db.clearDatabase();
    db.closeDatabase();
  });

  describe('GET /api/lawyers', () => {
    it('should return all lawyers without filters', async () => {
      const res = await request(app)
        .get('/api/lawyers');

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
    });

    it('should filter lawyers by expertise', async () => {
      const res = await request(app)
        .get('/api/lawyers')
        .query({ expertise: 'Criminal Law' });

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(1);
      expect(res.body[0].expertise).toContain('Criminal Law');
    });

    it('should filter lawyers by location', async () => {
      const res = await request(app)
        .get('/api/lawyers')
        .query({ location: 'New York' });

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(1);
      expect(res.body[0].location).toBe('New York');
    });
  });
});