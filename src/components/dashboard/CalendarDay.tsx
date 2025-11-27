// components/calendar/CalendarDay.tsx
"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { UnstyledLink } from "../shared";
import { Feather, Plus } from "lucide-react";

interface CalendarDayProps {
  date: Date;
  entries: { id: string; title: string }[];
  isToday?: boolean;
}

export default function CalendarDay({
  date,
  entries,
  isToday,
}: CalendarDayProps) {
  const hasEntries = entries.length > 0;
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "relative h-20 w-full flex flex-col items-center justify-start p-2 rounded-lg transition-all outline-none",
            "hover:bg-accent hover:text-accent-foreground",
            isToday && "border border-primary/60 shadow-sm",
            hasEntries && "bg-fuchsia-400/20 hover:bg-fuchsia-400/30",
          )}
        >
          <span className="text-sm font-medium">{date.getDate()}</span>
        </button>
      </PopoverTrigger>

      {/* PopoverContent must always exist, but show nothing if no entries */}
      <PopoverContent className={cn("w-56 p-3 z-50")} align="start">
        <h4 className="text-sm font-semibold mb-2">
          Entries on {date.toDateString()}
        </h4>

        <div className="space-y-2">
          {hasEntries &&
            entries.map((entry) => (
              <Button asChild key={entry.id} className="w-full" variant="ghost">
                <UnstyledLink
                  href={`/entries/${entry.id}`}
                  onClick={() => setOpen(false)}
                >
                  {entry.title}
                </UnstyledLink>
              </Button>
            ))}
          <Button
            asChild
            variant="ghost"
            className="text-sm text-left"
            size="sm"
          >
            <UnstyledLink href={`/entries/new`} onClick={() => setOpen(false)}>
              <Feather className="inline-block" /> Add New Entry
            </UnstyledLink>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
