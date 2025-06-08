import Database from 'better-sqlite3';

export function createTables(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS habito (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS diario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data TEXT NOT NULL, -- formato dd/mm/aaaa
        id_habito INTEGER NOT NULL,
        is_feito BOOLEAN NOT NULL DEFAULT 0,
        FOREIGN KEY (id_habito) REFERENCES habito(id) ON DELETE CASCADE
    );
  `);
}
