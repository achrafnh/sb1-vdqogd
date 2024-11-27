import db from '@/utils/db';
import type { SearchFilters, Lawyer } from '@/types';

export function searchLawyers(filters: SearchFilters): Lawyer[] {
  let query = `
    SELECT 
      l.*,
      u.name,
      u.email
    FROM lawyers l
    JOIN users u ON l.user_id = u.id
    WHERE 1=1
  `;
  
  const params: any[] = [];

  if (filters.expertise) {
    query += ` AND l.expertise LIKE ?`;
    params.push(`%${filters.expertise}%`);
  }

  if (filters.location) {
    query += ` AND l.location LIKE ?`;
    params.push(`%${filters.location}%`);
  }

  if (filters.rating) {
    query += ` AND l.rating >= ?`;
    params.push(filters.rating);
  }

  const stmt = db.prepare(query);
  const results = stmt.all(...params);

  return results.map(row => ({
    id: row.id,
    userId: row.user_id,
    name: row.name,
    email: row.email,
    expertise: JSON.parse(row.expertise),
    location: row.location,
    bio: row.bio,
    rating: row.rating,
    yearsOfExperience: row.years_of_experience,
    profileImage: row.profile_image
  }));
}

export function getLawyerById(id: number): Lawyer | undefined {
  const stmt = db.prepare(`
    SELECT 
      l.*,
      u.name,
      u.email
    FROM lawyers l
    JOIN users u ON l.user_id = u.id
    WHERE l.id = ?
  `);
  
  const row = stmt.get(id);
  
  if (!row) return undefined;

  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    email: row.email,
    expertise: JSON.parse(row.expertise),
    location: row.location,
    bio: row.bio,
    rating: row.rating,
    yearsOfExperience: row.years_of_experience,
    profileImage: row.profile_image
  };
}