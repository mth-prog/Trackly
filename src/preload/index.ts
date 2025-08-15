import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI, ElectronAPI } from '@electron-toolkit/preload'

declare global {
  export interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}

// Custom APIs for renderer
const api = {
  criarHabito: (nome: string, descricao = '') => {
    return ipcRenderer.invoke('criarHabito', nome, descricao)
  },

  listarHabito: () => {
    return Promise.resolve(ipcRenderer.invoke('listarHabitos'))
  },

  buscarHabito: (nome: string) => {
    return ipcRenderer.invoke('buscarHabito', nome)
  },

  atualizarHabito: (nome: string, descricao: string) => {
    return ipcRenderer.invoke('atualizarHabito', nome, descricao)
  },

  deletarHabito: (nome: string) => {
    return ipcRenderer.invoke('deletarHabito', nome)
  },


  // Referente ao Diario. 
  criarRegistro: (data: string, idHabito: number, isFeito: number) => {
    return ipcRenderer.invoke('criarRegistro', data, idHabito, isFeito)
  },

  listarRegistros: () => {
    return ipcRenderer.invoke('listarRegistros')
  },

  atualizarRegistro: (id: number, isFeito: boolean) => {
    return ipcRenderer.invoke('atualizarRegistro', id, isFeito)
  },

  deletarRegistro: (id: number) => {
    return ipcRenderer.invoke('deletarRegistro', id)
  }
}
// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
