"use client"

import { useMemo } from "react"
import { cn } from "../utils/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/tooltip"
import { addDays, formatDdMmAaaa, getMonthShortPt, getWeekStartSunday } from "../components/date-utils"

type HeatmapProps = {
  countsByDate: Record<string, number>
  className?: string
  // optional props for customization
  weeksBack?: number // default ~52
}

export function Heatmap({ countsByDate, className, weeksBack = 53 }: HeatmapProps) {
  // Build all days from (start = weeksBack * 7 days ago, aligned to Sunday) to today
  const { weeks, monthLabels } = useMemo(() => {
    const today = new Date()
    const end = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const approxStart = addDays(end, -weeksBack * 7 + 1) // include today column
    const start = getWeekStartSunday(approxStart)

    const totalDays = Math.floor((end.getTime() - start.getTime()) / (24 * 3600 * 1000)) + 1
    const numWeeks = Math.ceil(totalDays / 7)

    const weeks: Date[][] = []
    const monthLabels: { index: number; label: string }[] = []

    for (let w = 0; w < numWeeks; w++) {
      const col: Date[] = []
      for (let d = 0; d < 7; d++) {
        const day = addDays(start, w * 7 + d)
        col.push(day)
      }
      // Add month label at first week where day-of-month is within first 7 days and month changes
      const firstDay = col[0]
      // Show month label if it's the first week of a month boundary or near it
      if (firstDay.getDate() <= 7) {
        monthLabels.push({ index: w, label: getMonthShortPt(firstDay) })
      }
      weeks.push(col)
    }

    return { weeks, monthLabels }
  }, [countsByDate, weeksBack])

  const maxCount = useMemo(() => {
    let max = 0
    for (const v of Object.values(countsByDate)) {
      if (v > max) max = v
    }
    return max
  }, [countsByDate])

  function colorFor(count: number): string {
    if (count <= 0) return "bg-neutral-200 dark:bg-neutral-800"
    // Normalize in 4 buckets
    // If maxCount is small, keep scale readable
    const thresholds =
      maxCount > 0
        ? [1, Math.max(2, Math.ceil(maxCount * 0.4)), Math.max(3, Math.ceil(maxCount * 0.7)), maxCount]
        : [1, 2, 3, 4]
    if (count <= thresholds[0]) return "bg-emerald-100 dark:bg-emerald-900/50"
    if (count <= thresholds[1]) return "bg-emerald-300"
    if (count <= thresholds[2]) return "bg-emerald-500"
    return "bg-emerald-700"
  }

  // Labels for days (Mon, Wed, Fri) like GitHub
  const dayLabels = ["", "Seg", "", "Qua", "", "Sex", ""]
  // We used Sunday-start alignment; adjust labels to the left column look-and-feel
  // GitHub shows Mon/Wed/Fri; we'll map positions: 1=Mon, 3=Wed, 5=Fri

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <div
        className="inline-grid gap-x-1"
        style={{ gridTemplateColumns: `auto repeat(${weeks.length}, minmax(10px, 12px))` }}
      >
        {/* Month labels row */}
        <div />
        {weeks.map((col, idx) => {
          const label = monthLabels.find((m) => m.index === idx)?.label
          return (
            <div key={`ml-${idx}`} className="text-[10px] text-muted-foreground h-4">
              {label ? label : ""}
            </div>
          )
        })}

        {/* Day labels + squares */}
        {Array.from({ length: 7 }).map((_, row) => (
          <div key={`dl-${row}`} className="contents">
            <div className={cn("text-[10px] text-muted-foreground h-3 leading-3 mt-1", row === 0 ? "mt-0" : "")}>
              {dayLabels[row]}
            </div>
            {weeks.map((col, wIdx) => {
              const date = col[row]
              const key = formatDdMmAaaa(date)
              const count = countsByDate[key] ?? 0
              return (
                <TooltipProvider key={`sq-${wIdx}-${row}`} delayDuration={50}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={cn(
                          "h-3 w-3 md:h-3.5 md:w-3.5 rounded-[3px] border border-black/5 dark:border-white/5",
                          colorFor(count),
                        )}
                        aria-label={`${count} concluído(s) em ${key}`}
                      />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="px-2 py-1 text-xs">
                      <div className="font-medium">
                        {count} {count === 1 ? "hábito" : "hábitos"} concluído{count === 1 ? "" : "s"}
                      </div>
                      <div className="text-muted-foreground">{key}</div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
