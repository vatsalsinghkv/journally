"use client";

import EntryCard from "@/components/entries/EntryCard";
import { useJournal } from "@/lib/hooks/use-journal";

export default function EntriesPage() {
  const { entries } = useJournal();

  if (entries.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10">
        No entries yet — start writing your first thought ✨
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {entries.slice(0, 6).map((entry) => (
        <EntryCard key={entry.id} {...entry} />
      ))}
    </div>
  );
}
