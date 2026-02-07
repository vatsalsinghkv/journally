"use client";

import { useState } from "react";
import { useJournal } from "@/lib/hooks/use-journal";
import CalendarHeader from "./CalendarHeader";
import CalendarDay from "./CalendarDay";
import { getDaysInMonth } from "@/lib/utils";
import { getLocalDateKey } from "@/lib/utils";

export default function CalendarView() {
  const entries = useJournal((s) => s.entries);

  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const daysInMonth = getDaysInMonth(currentMonth.getMonth());

  const entriesByDate: Record<string, { id: string; title: string }[]> = {};

  entries.forEach((entry) => {
    const date = new Date(entry.date);
    const key = getLocalDateKey(date);

    if (!entriesByDate[key]) entriesByDate[key] = [];
    entriesByDate[key].push({ id: entry.id, title: entry.title });
  });

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1,
  ).getDay();

  const leadingEmptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => {
    const d = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      i + 1,
    );

    const key = getLocalDateKey(d);

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

        {leadingEmptyDays.map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {daysArray.map((day) => (
          <CalendarDay
            key={getLocalDateKey(day.date)}
            date={day.date}
            entries={day.entries}
            isToday={day.isToday}
          />
        ))}
      </div>
    </div>
  );
}
