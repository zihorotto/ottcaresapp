import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import profileRoutes from '../src/routes/profile.js';

const app = express();
app.use(express.json());
app.use('/profile', profileRoutes);

describe('Profile API', () => {
  it('GET /profile should return 401 if not authenticated', async () => {
    const res = await request(app).get('/profile');
    expect(res.statusCode).toBe(401);
  });
});
