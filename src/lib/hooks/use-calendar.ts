"use client";

import { useState, useCallback } from "react";

export function useCalendar() {
  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const nextMonth = useCallback(() => {
    setMonth((m) => {
      if (m === 11) {
        setYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  }, []);

  const prevMonth = useCallback(() => {
    setMonth((m) => {
      if (m === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  }, []);

  const goToToday = useCallback(() => {
    setMonth(today.getMonth());
    setYear(today.getFullYear());
  }, [today]);

  /* ---- Helpers ---- */
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][month];

  return {
    today,
    month,
    year,
    monthName,
    daysInMonth,
    firstDayIndex,
    nextMonth,
    prevMonth,
    goToToday,
  };
}
