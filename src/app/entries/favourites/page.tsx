"use client";

import EntryCard from "@/components/entries/EntryCard";
import { useJournal } from "@/lib/hooks/use-journal";

export default function FavoriteEntriesPage() {
  const { entries } = useJournal();

  console.log({ entries });
  const favouriteEntries = entries.filter((entry) => entry.isFavorite);

  if (favouriteEntries.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10">
        No entries yet — start writing your first thought ✨
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {favouriteEntries.map((entry) => (
        <EntryCard key={entry.id} {...entry} />
      ))}
    </div>
  );
}
