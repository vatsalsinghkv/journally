"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCalendar } from "@/lib/hooks/use-calendar";
import { UnstyledLink } from "../shared";

export default function CalendarView() {
  const {
    today,
    month,
    year,
    monthName,
    daysInMonth,
    firstDayIndex,
    nextMonth,
    prevMonth,
    goToToday,
  } = useCalendar();

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <section className="space-y-4">
      {/* Month Header */}
      <header className="flex items-center justify-center gap-10">
        <Button variant="ghost" size="icon" onClick={prevMonth}>
          <ChevronLeft />
        </Button>

        <h1 className="h2 font-bold">{monthName}</h1>

        <Button variant="ghost" size="icon" onClick={nextMonth}>
          <ChevronRight />
        </Button>
      </header>

      {/* Go to Today */}
      <div className="flex -mt-3 justify-center">
        <Button
          variant="ghost"
          className="text-xs"
          size="sm"
          onClick={goToToday}
        >
          <RefreshCw className="w-2 h-2" />
          Today
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 mt-2 gap-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center uppercase font-semibold text-muted-foreground text-xs"
          >
            {day}
          </div>
        ))}

        {/* Empty slots before 1st */}
        {Array.from({ length: firstDayIndex }).map((_, idx) => (
          <div key={`empty-${idx + daysInMonth}`} className="h-10" />
        ))}

        {/* Days */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          return (
            <Button
              asChild
              key={day}
              variant="secondary"
              className={cn(
                "h-20 w-full rounded-lg bg-blue-50 text-muted-foreground flex items-start justify-end p-2",
                isToday &&
                  "bg-blue-50 text-blue-600 font-bold border border-blue-100 hover:bg-blue-100",
              )}
            >
              <UnstyledLink href="/entries/new">{day}</UnstyledLink>
            </Button>
          );
        })}
      </div>

      {/* <EntryForm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedDate={selectedDate}
      /> */}
    </section>
  );
}
