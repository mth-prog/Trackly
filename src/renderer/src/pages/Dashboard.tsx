import React, { useEffect, useMemo, useState } from "react"
import { Heatmap } from "./heatmap"

type Habito = {
  id: number
  nome: string
  descricao?: string
  is_deleted?: boolean
}

type Registro = {
  id: number
  id_habito: number
  data: string // formato dd/mm/aaaa
  is_feito: boolean
}

type SelectionMap = Record<number, boolean>

function formatDdMmAaaa(date: Date): string {
  const d = String(date.getDate()).padStart(2, "0")
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const y = date.getFullYear()
  return `${d}/${m}/${y}`
}

function toInputDateValue(ddmmaaaa: string): string {
  // dd/mm/aaaa -> yyyy-mm-dd
  const [d, m, y] = ddmmaaaa.split("/")
  return `${y}-${m}-${d}`
}

function parseFromInputDate(val: string): Date | null {
  // yyyy-mm-dd
  const [y, m, d] = val.split("-")
  if (!y || !m || !d) return null
  return new Date(Number(y), Number(m) - 1, Number(d))
}

function HabitsDashboard(): React.JSX.Element {
  const [habitos, setHabitos] = useState<Habito[]>([])
  const [registros, setRegistros] = useState<Registro[]>([])
  const [selecionados, setSelecionados] = useState<SelectionMap>({})
  const [dataDdMmAaaa, setDataDdMmAaaa] = useState<string>(formatDdMmAaaa(new Date()))
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const [toastType, setToastType] = useState<"success" | "error">("success")

  // Carrega hábitos e registros do preload
  useEffect(() => {
    async function fetchData() {
      const habitos = await window.api.listarHabito()
      setHabitos(habitos)
      const registros = await window.api.listarRegistros()
      setRegistros(registros)
    }
    fetchData()
  }, [])

  // Atualiza registros após salvar
  async function reloadRegistros() {
    const registros = await window.api.listarRegistros()
    setRegistros(registros)
  }

  function toggleSelecionado(id: number, checked: boolean | string) {
    setSelecionados((prev) => ({
      ...prev,
      [id]: Boolean(checked),
    }))
  }

  async function handleSaveDiario() {
    const selecionadosIds = Object.entries(selecionados)
      .filter(([, val]) => !!val)
      .map(([id]) => Number(id))

    if (selecionadosIds.length === 0) {
      setToastType("error")
      setToastMsg("Selecione pelo menos um hábito")
      return
    }

    // Salva cada hábito selecionado como feito para a data escolhida
    for (const id_habito of selecionadosIds) {
      await window.api.criarRegistro(dataDdMmAaaa, id_habito, true)
    }
    setSelecionados({})
    setToastType("success")
    setToastMsg("Diário salvo!")
    reloadRegistros()
  }

  function onDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value // yyyy-mm-dd
    const date = parseFromInputDate(v)
    if (date) setDataDdMmAaaa(formatDdMmAaaa(date))
  }

  const inputDateValue = toInputDateValue(dataDdMmAaaa)

  // Mapa de data -> quantidade de hábitos feitos
  const countsByDate = useMemo(() => {
    const map = new Map<string, number>()
    for (const d of registros) {
      if (d.is_feito) {
        map.set(d.data, (map.get(d.data) ?? 0) + 1)
      }
    }
    const obj: Record<string, number> = {}
    for (const [k, v] of map.entries()) obj[k] = v
    return obj
  }, [registros])

    const anosDisponiveis = useMemo(() => {
    const anos = new Set<number>()
    registros.forEach(r => {
      const [d, m, y] = r.data.split("/")
      anos.add(Number(y))
    })
    return Array.from(anos).sort((a, b) => b - a)
  }, [registros])

    const countsByDateAno = useMemo(() => {
      const obj: Record<string, number> = {}
      Object.entries(countsByDate).forEach(([k, v]) => {
        if (k.endsWith(`/${selectedYear}`)) obj[k] = v
      })
      return obj
    }, [countsByDate, selectedYear])

  // Toast simples
  function Toast() {
    if (!toastMsg) return null
    return (
      <div
        className={`fixed top-5 right-5 px-5 py-3 rounded shadow-lg font-medium z-50
          ${toastType === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}
        `}
        onClick={() => setToastMsg(null)}
      >
        {toastMsg}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Toast />
      <header className="border-b border-slate-600 bg-gray-900">
        <div className="max-w-4xl mx-auto py-6 px-4">
          <h1 className="text-2xl font-bold text-slate-100">Dashboard de Controle de Hábitos</h1>
          <p className="text-slate-400 mt-1">
            Selecione hábitos por dia, registre no diário e acompanhe seu histórico no mapa de calor.
          </p>
        </div>
      </header>

      <main className="py-8 px-4 flex flex-row gap-8 items-start">
        {/* Coluna Esquerda */}
        <div className="bg-gray-900 rounded-xl shadow p-8 border border-slate-700 w-full max-w-xl flex-1">
          <h2 className="text-lg font-semibold text-slate-100 mb-2">Selecionar Hábitos do Dia</h2>
          <p className="text-slate-400 text-sm mb-4">
            Escolha os hábitos cadastrados para um dia específico e salve no diário.
          </p>
          <div className="mb-4">
            <label htmlFor="data" className="font-medium flex items-center gap-2 text-slate-200">
              📅 Data
            </label>
            <input
              id="data"
              type="date"
              value={inputDateValue}
              onChange={onDateChange}
              className="mt-1 p-2 rounded bg-gray-800 border border-slate-700 text-slate-100"
            />
            <div className="text-xs text-slate-400 mt-1">Formato salvo: {dataDdMmAaaa}</div>
          </div>
          <hr className="my-4 border-slate-700" />
          <div>
            <div className="font-medium text-slate-200 mb-2">Hábitos cadastrados</div>
            <div className="flex flex-col gap-2">
              {habitos.length === 0 && (
                <div className="text-slate-400 text-sm">
                  Nenhum hábito cadastrado ainda. Adicione um acima.
                </div>
              )}
              {habitos
                .filter((h) => !h.is_deleted)
                .map((h) => (
                  <label key={h.id} className="flex items-center gap-2 text-slate-100">
                    <input
                      type="checkbox"
                      checked={!!selecionados[h.id]}
                      onChange={(e) => toggleSelecionado(h.id, e.target.checked)}
                      className="accent-green-600"
                    />
                    <div>
                      <div className="font-medium">{h.nome}</div>
                      {h.descricao && (
                        <div className="text-xs text-slate-400">{h.descricao}</div>
                      )}
                    </div>
                  </label>
                ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-6">
            <button
              onClick={handleSaveDiario}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition"
            >
              Salvar no Diário
            </button>
            <span className="text-xs text-slate-400">✔ Os selecionados serão marcados como feitos</span>
          </div>
        </div>

        {/* Coluna Direita */}
        <div className="bg-gray-900 rounded-xl shadow p-8 border border-slate-700 w-full max-w-xl flex-1">
          <h2 className="text-lg font-semibold mb-2 text-slate-100">Histórico (Periodo de 1 ano)</h2>
            <p className="text-slate-400 text-sm mb-4">
              Cada quadrado representa um dia. Quanto mais escuro, mais hábitos concluídos naquele dia.
            </p>
            <div className="flex flex-col gap-2">
            <div className="flex gap-2 mb-2">
              {anosDisponiveis.map(ano => (
                <button
                  key={ano}
                  onClick={() => setSelectedYear(ano)}
                  className={`px-3 py-1 rounded ${ano === selectedYear ? "bg-blue-600 text-white" : "bg-gray-800 text-slate-300"}`}
                >
                  {ano}
                </button>
              ))}
            </div>  
            <Heatmap countsByDate={countsByDateAno} year={selectedYear} />
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">

            <span>Menos</span>
            <span className="w-4 h-4 rounded bg-gray-800 border border-slate-700 inline-block" />
            <span className="w-4 h-4 rounded bg-green-900 border border-green-800 inline-block" />
            <span className="w-4 h-4 rounded bg-green-700 border border-green-600 inline-block" />
            <span className="w-4 h-4 rounded bg-green-500 border border-green-400 inline-block" />
            <span>Mais</span>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HabitsDashboard