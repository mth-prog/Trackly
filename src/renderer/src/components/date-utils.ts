export function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n)
}

export function formatDdMmAaaa(date: Date): string {
  const d = pad2(date.getDate())
  const m = pad2(date.getMonth() + 1)
  const y = date.getFullYear()
  return `${d}/${m}/${y}`
}

export function parseDdMmAaaa(s: string): Date | null {
  const m = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (!m) return null
  const day = Number(m[1])
  const month = Number(m[2]) - 1
  const year = Number(m[3])
  const dt = new Date(year, month, day)
  if (dt.getFullYear() === year && dt.getMonth() === month && dt.getDate() === day) return dt
  return null
}

// Input date helpers (input[type=date] uses yyyy-mm-dd)
export function parseFromInputDate(v: string): Date | null {
  const m = v.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!m) return null
  const y = Number(m[1])
  const mo = Number(m[2]) - 1
  const d = Number(m[3])
  const dt = new Date(y, mo, d)
  if (dt.getFullYear() === y && dt.getMonth() === mo && dt.getDate() === d) return dt
  return null
}

export function toInputDateValue(ddMmAaaa: string): string {
  const dt = parseDdMmAaaa(ddMmAaaa)
  if (!dt) return ""
  const y = dt.getFullYear()
  const m = pad2(dt.getMonth() + 1)
  const d = pad2(dt.getDate())
  return `${y}-${m}-${d}`
}

export function addDays(date: Date, days: number): Date {
  const dt = new Date(date)
  dt.setDate(dt.getDate() + days)
  return dt
}

export function getWeekStartSunday(date: Date): Date {
  const dt = new Date(date)
  const day = dt.getDay() // 0=Sun
  dt.setDate(dt.getDate() - day)
  dt.setHours(0, 0, 0, 0)
  return dt
}

const MONTHS_PT = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
export function getMonthShortPt(date: Date): string {
  return MONTHS_PT[date.getMonth()]
}

export function isSameMonth(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth()
}
