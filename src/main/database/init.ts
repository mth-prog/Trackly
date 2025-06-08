import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { app } from 'electron';
import { createTables } from './schemas';

export const dbPath = path.join(app.getPath('userData'), 'database.db');

console.log(dbPath);


export function setupDatabase(): Database.Database {
  const firstRun = !fs.existsSync(dbPath);
  const db = new Database(dbPath);

  if (firstRun) {
    createTables(db);
  }

  return db;
}

