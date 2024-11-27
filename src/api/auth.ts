import db from '@/utils/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key';

export async function loginUser(email: string, password: string) {
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
  
  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.created_at
    },
    token
  };
}

export async function registerUser(userData: { email: string; password: string; name: string; role: string }) {
  // Validate input
  if (!userData.email || !userData.password || !userData.name || !userData.role) {
    throw new Error('All fields are required');
  }

  // Check if email already exists
  const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(userData.email);
  if (existingUser) {
    throw new Error('Email already exists');
  }

  const hashedPassword = bcrypt.hashSync(userData.password, 10);
  
  try {
    const result = db.prepare(`
      INSERT INTO users (email, password, name, role)
      VALUES (?, ?, ?, ?)
    `).run(userData.email, hashedPassword, userData.name, userData.role);

    const newUser = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '24h' });
    
    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        createdAt: newUser.created_at
      },
      token
    };
  } catch (error) {
    throw new Error('Failed to create user account');
  }
}