"use client"

import * as React from "react"
import { CalendarDays, ChevronDownIcon } from "lucide-react"
import { cn } from "cn"

import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

function DatePickerField({
  label,
  placeholder = "Selecciona una fecha",
  className,
}: {
  label: string
  placeholder?: string
  className?: string
}) {
  const [date, setDate] = React.useState<Date | undefined>()

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "flex min-w-[180px] items-center justify-between gap-3 rounded-pill border-[1.5px] border-[var(--border)] bg-card px-5 py-3.5 text-left outline-none transition-colors hover:border-[var(--blue)] focus-visible:border-[var(--blue)] focus-visible:ring-3 focus-visible:ring-[var(--blue)]/30",
          className
        )}
      >
        <CalendarDays className="size-5 shrink-0 text-[var(--gray-400)]" />
        <span className="flex flex-1 flex-col gap-0.5 leading-none">
          <span className="text-[11px] font-bold tracking-wide text-[var(--gray-400)]">{label}</span>
          <span
            className={cn(
              "text-sm",
              date ? "font-extrabold text-[var(--ink)]" : "font-semibold text-[var(--gray-400)]"
            )}
          >
            {date
              ? date.toLocaleDateString("es-MX", { day: "numeric", month: "short" })
              : placeholder}
          </span>
        </span>
        <ChevronDownIcon className="pointer-events-none size-4 shrink-0 text-[var(--gray-400)]" />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  )
}

export { DatePickerField }
