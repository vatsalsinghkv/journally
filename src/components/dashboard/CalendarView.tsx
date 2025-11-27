"use client";

import { useState } from "react";

import { useJournal } from "@/lib/hooks/use-journal";
import CalendarHeader from "./CalendarHeader";
import CalendarDay from "./CalendarDay";
import { getDaysInMonth } from "@/lib/utils";

export default function CalendarView() {
  const { entries } = useJournal();

  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const daysInMonth = getDaysInMonth(currentMonth.getMonth());

  // group entries by date for faster lookup
  const entriesByDate: Record<string, { id: string; title: string }[]> = {};
  entries.forEach((entry) => {
    const key = entry.date.slice(0, 10);
    if (!entriesByDate[key]) entriesByDate[key] = [];
    entriesByDate[key].push({ id: entry.id, title: entry.title });
  });

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => {
    const d = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      i + 1,
    );
    const key = d.toISOString().slice(0, 10);

    return {
      date: d,
      entries: entriesByDate[key] || [],
      isToday: new Date().toDateString() === d.toDateString(),
    };
  });

  return (
    <div className="max-w-4xl mx-auto">
      <CalendarHeader
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />

      <div className="grid grid-cols-7 gap-2 mt-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div
            key={d}
            className="text-center text-sm font-medium text-muted-foreground"
          >
            {d}
          </div>
        ))}

        {daysArray.map((day, i) => (
          <CalendarDay
            key={i}
            date={day.date}
            entries={day.entries}
            isToday={day.isToday}
          />
        ))}
      </div>
    </div>
  );
}
