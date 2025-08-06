import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { app } from 'electron';
import { createTables } from './schemas';

export const dbPath = path.join(app.getPath('userData'), 'database.db');

export function checkDatabase():Boolean {
  const check =! fs.existsSync(dbPath);
  
  return check
}; 

//TODO: Validar para criar um banco novo quando ele é deletado porque isso nao está funcionado. 

export function setupDatabase(): Database.Database {
  // Garante que o diretório existe
  fs.mkdirSync(path.dirname(dbPath), { recursive: true })

  let db: Database.Database

  try {
    db = new Database(dbPath)
    // Se o banco existe mas está corrompido, pode lançar erro aqui
    // Testa se a tabela principal existe, se não, cria
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='habito'").get()
    if (!tables) {
      createTables(db)
    }
  } catch (error) {
    // Se falhar ao abrir/criar, remove arquivo e tenta criar novo
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath)
    }
    db = new Database(dbPath)
    createTables(db)
  }

  return db
}
