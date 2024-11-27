export interface User {
  id: number;
  email: string;
  name: string;
  role: 'user' | 'lawyer' | 'admin';
  createdAt: Date;
}

export interface Lawyer {
  id: number;
  userId: number;
  expertise: string[];
  location: string;
  bio: string;
  rating: number;
  yearsOfExperience: number;
  profileImage?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface SearchFilters {
  expertise?: string;
  location?: string;
  rating?: number;
}