const fs = require('fs');
const path = require('path');
const db = require('../src/db');

(async () => {
  try {
    const migrationsDir = path.join(__dirname, '..', 'migrations');
    const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();
    for (const f of files) {
      const sql = fs.readFileSync(path.join(migrationsDir, f), 'utf8');
      console.log('Applying', f);
      await db.query(sql);
    }
    console.log('Migrations applied successfully');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed', err);
    process.exit(1);
  }
})();
