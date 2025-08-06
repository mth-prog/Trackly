import { ipcMain, IpcMain } from "electron";
import Database from "better-sqlite3";
import { dbPath } from '../database/init'

//chamada de banco de dados 

const db = new Database(dbPath)

// Criar um hábito
ipcMain.handle('criarHabito', async (event, nome: string, descricao: string = '') => {
  console.log('[MAIN] Recebido:', nome, descricao);

  if (!nome) {
    throw new Error("O campo 'nome' é obrigatório.");
  }

  const stmt = db.prepare('INSERT INTO habito (nome, descricao) VALUES (?, ?)');
  const info = stmt.run(nome, descricao);
  return Promise.resolve(info.lastInsertRowid);
});


// Listar hábitos (não deletados) 
// TODO: colocar o filtro na listagem 
ipcMain.handle("listarHabitos",  () => {
    return db.prepare('SELECT * FROM habito WHERE is_deleted = false').all();
})

// Buscar um hábito por nome
ipcMain.handle("buscarHabito", (_, nome: string) => {
    return db.prepare('SELECT * FROM habito WHERE nome = ? AND is_deleted = false').get(nome);
})

// Atualizar um hábito
ipcMain.handle("atualizarHabito", (_,
    nome:String, 
    descricao:String
) => {
    const stmt = db.prepare('UPDATE habito SET nome = ?, descricao = ? WHERE id = ? AND is_deleted = false');
    return stmt.run(nome, descricao);
})

// Marcar hábito como deletado (soft delete)
ipcMain.handle("deletarHabito", (_, 
    nome: String
) => {
    return db.prepare('UPDATE habito SET is_deleted = 1 WHERE nome = ?').run(nome)
})


// Criar um registro no diário
ipcMain.handle("criarRegistro", (data, idHabito, isFeito = false) => {
    const stmt = db.prepare('INSERT INTO diario (data, id_habito, is_feito) VALUES (?, ?, ?)');
    return stmt.run(data, idHabito, isFeito);
})

// Listar registros do diário
ipcMain.handle("listarRegistros", () => {
    return db.prepare(`
        SELECT d.*, h.nome AS nome_habito 
        FROM diario d 
        JOIN habito h ON d.id_habito = h.id 
        WHERE h.is_deleted = false
    `).all();
})

// Atualizar um registro do diário
ipcMain.handle("atualizarRegistro", (id, isFeito) => {
    return db.prepare('UPDATE diario SET is_feito = ? WHERE id = ?').run(isFeito ? 1 : 0, id);
})

// Deletar um registro do diário
ipcMain.handle("deletarRegistro", (id) => {
    return db.prepare('DELETE FROM diario WHERE id = ?').run(id);
})
