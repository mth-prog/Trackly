import { ipcMain, IpcMain } from "electron";
import Database from "better-sqlite3";
import { dbPath } from '../database/init'

//chamada de banco de dados 

const db = new Database(dbPath, {fileMustExist: true})

// Criar um hábito
ipcMain.handle("criarHabito", (_,
    nome:string, 
    descricao = ''
) => {
    const stmt = db.prepare('INSERT INTO habito (nome, descricao) VALUES (?, ?)');
    const info = stmt.run(nome, descricao);
    return info.lastInsertRowid;
})

// Listar hábitos (não deletados)
ipcMain.handle("listarHabitos",  () =>{
    return db.prepare('SELECT * FROM habito WHERE is_deleted = false').all();
})

// Buscar um hábito por ID
ipcMain.handle(" buscarHabito", (_, id:number) => {
    return db.prepare('SELECT * FROM habito WHERE id = ? AND is_deleted = false').get(id);
})

// Atualizar um hábito
ipcMain.handle("atualizarHabito", (_,
    id, 
    nome:string, 
    descricao:string
) => {
    const stmt = db.prepare('UPDATE habito SET nome = ?, descricao = ? WHERE id = ? AND is_deleted = false');
    return stmt.run(nome, descricao, id);
})

// Marcar hábito como deletado (soft delete)
ipcMain.handle("deletarHabito", (_, 
    id
) => {
    return db.prepare('UPDATE habito SET is_deleted = 1 WHERE id = ?').run(id)
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
