import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import authRoutes from './routes/auth.js';
import lawyerRoutes from './routes/lawyers.js';
import { authMiddleware } from './middleware/auth.js';
import db from '../utils/db';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Initialize database
db.initializeDatabase();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/lawyers', lawyerRoutes);

// Protected routes
app.use('/api/profile', authMiddleware, (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    res.json(user);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

let server: any = null;

export function startServer(port: number = 3000) {
  return new Promise((resolve, reject) => {
    if (server) {
      reject(new Error('Server is already running'));
      return;
    }

    server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      resolve(server);
    });

    server.on('error', (error: any) => {
      server = null;
      reject(error);
    });
  });
}

export function stopServer() {
  return new Promise((resolve) => {
    if (server) {
      server.close(() => {
        server = null;
        resolve(true);
      });
    } else {
      resolve(true);
    }
  });
}

// Only start the server if this file is run directly
if (import.meta.url === `file://${__filename}`) {
  startServer();
}

export default app;