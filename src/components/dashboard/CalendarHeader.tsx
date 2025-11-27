"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CalendarHeaderProps {
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
}

export default function CalendarHeader({
  currentMonth,
  setCurrentMonth,
}: CalendarHeaderProps) {
  const handlePrev = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  // move to next month
  const handleNext = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  const handleToday = () => {
    const now = new Date();
    setCurrentMonth(new Date(now.getFullYear(), now.getMonth(), 1));
  };

  return (
    <div className="flex items-center justify-between mb-10">
      {/* Month + Year */}
      <h2 className="text-2xl font-bold">
        {currentMonth.toLocaleString("en-IN", {
          month: "long",
          year: "numeric",
        })}
      </h2>

      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={handleToday}>
          Today
        </Button>

        <Button size="icon" variant="outline" onClick={handlePrev}>
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <Button size="icon" variant="outline" onClick={handleNext}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
