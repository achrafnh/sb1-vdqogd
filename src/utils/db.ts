import Loki from 'lokijs';

class Database {
  private db: Loki | null = null;
  private users: Collection<any> | null = null;
  private lawyers: Collection<any> | null = null;

  initializeDatabase() {
    if (this.db) {
      return this.db;
    }

    try {
      this.db = new Loki('legalconnect.db', {
        autoload: false,
        autosave: false,
        verbose: false
      });
      
      // Create collections
      this.users = this.db.addCollection('users', {
        unique: ['email'],
        indices: ['email']
      });
      
      this.lawyers = this.db.addCollection('lawyers', {
        indices: ['userId']
      });

      console.log('Database initialized successfully');
      return this.db;
    } catch (error) {
      console.error('Database initialization error:', error);
      throw error;
    }
  }

  getUsers() {
    if (!this.users) {
      throw new Error('Database not initialized');
    }
    return this.users;
  }

  getLawyers() {
    if (!this.lawyers) {
      throw new Error('Database not initialized');
    }
    return this.lawyers;
  }

  clearDatabase() {
    if (this.users) this.users.clear();
    if (this.lawyers) this.lawyers.clear();
  }

  closeDatabase() {
    if (this.db) {
      this.users = null;
      this.lawyers = null;
      this.db = null;
    }
  }
}

export default new Database();