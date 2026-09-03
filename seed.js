const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');

const db = new Database('./prisma/dev.db');

async function seed() {
  const email = 'karrinki9608@gmail.com';
  const password = 'Rinki@26';
  const hashedPassword = await bcrypt.hash(password, 10);
  const now = new Date().toISOString();

  const stmtCreate = db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      profile_image TEXT,
      active_theme TEXT DEFAULT 'default',
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  stmtCreate.run();

  const stmt = db.prepare('INSERT INTO users (id, name, email, password, profile_image, active_theme, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
  
  try {
    stmt.run('user_admin_12345', 'Admin User', email, hashedPassword, null, 'default', 'admin', now, now);
    console.log('Admin user created successfully');
  } catch (err) {
    if (err.message.includes('UNIQUE constraint failed')) {
      console.log('Admin user already exists. Updating password...');
      const updateStmt = db.prepare('UPDATE users SET password = ? WHERE email = ?');
      updateStmt.run(hashedPassword, email);
      console.log('Admin password updated successfully');
    } else {
      console.error('Error seeding database:', err);
    }
  }
}

seed();
