// components/calendar/CalendarDay.tsx
"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Feather, Plus } from "lucide-react";
import { UnstyledLink } from "@/components/shared";

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
            "relative h-20 w-full rounded-lg p-2 text-left transition",
            "hover:bg-accent hover:text-accent-foreground",
            "flex flex-col gap-1 outline-none",
            isToday && "bg-fuchsia-500/20 hover:bg-fuchsia-500/30",
            hasEntries && !isToday && "bg-gray-400/10 hover:bg-gray-400/20",
          )}
        >
          {/* Day number */}
          <span className="text-sm font-medium">{date.getDate()}</span>

          {/* Entry count badge */}
          {hasEntries && (
            <span className="absolute top-2 right-2 text-xs font-semibold rounded-full bg-fuchsia-400/80 text-primary-foreground px-2 py-0.5">
              {entries.length}
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-64 p-3">
        <h4 className="text-sm font-semibold mb-3">
          Entries on {date.toDateString()}
        </h4>

        <div className="space-y-1">
          {/* Existing entries */}
          {hasEntries &&
            entries.map((entry) => (
              <Button
                key={entry.id}
                variant="ghost"
                className="w-full justify-start text-sm"
                asChild
              >
                <UnstyledLink
                  href={`/entries/${entry.id}`}
                  onClick={() => setOpen(false)}
                >
                  <Feather className="mr-2 h-4 w-4 text-muted-foreground" />
                  {entry.title}
                </UnstyledLink>
              </Button>
            ))}

          {/* Divider */}
          <div className="h-px bg-border my-2" />

          {/* Add new entry */}
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-primary"
            asChild
          >
            <UnstyledLink
              href={`/entries/new?date=${date.toISOString().slice(0, 10)}`}
              onClick={() => setOpen(false)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add new entry
            </UnstyledLink>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
