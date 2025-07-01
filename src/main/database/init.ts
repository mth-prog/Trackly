import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { app } from 'electron';
import { createTables } from './schemas';

export const dbPath = path.join(app.getPath('userData'), 'database.db');

export function checkDatabase():Boolean {
  const check =!fs.existsSync(dbPath);
  
  return check
}; 

export function setupDatabase(): Database.Database {
  const firstRun = checkDatabase()
  const db = new Database(dbPath);

  if (firstRun) {
    createTables(db);
  }

  return db;
}

