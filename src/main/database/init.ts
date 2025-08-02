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

//TODO: Validar para criar um banco novo quando ele é deletado porque isso nao está funcionado. 

export function setupDatabase(): Database.Database {
  const firstRun = checkDatabase()
  // Garante que o diretório existe
  fs.mkdirSync(path.dirname(dbPath), { recursive: true })

  const db = new Database(dbPath);

  if (firstRun) {
    createTables(db);
  }

  return db;
}

