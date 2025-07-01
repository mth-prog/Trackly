import { ipcMain, IpcMain } from "electron";
import Database from "better-sqlite3";
import {checkDatabase, dbPath} from '../database/init'

//chamada de banco de dados 

const db = new Database(dbPath, {fileMustExist: true})


ipcMain.handle("habits", () => {
    return {'novo': [1, 2, 3]}
})
