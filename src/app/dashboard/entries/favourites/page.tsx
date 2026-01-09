"use client";

import EntryCard from "@/components/entries/EntryCard";
import { ErrorUI } from "@/components/shared";
import { useJournal } from "@/lib/hooks/use-journal";

export default function FavoriteEntriesPage() {
  const { entries } = useJournal();

  console.log({ entries });
  const favouriteEntries = entries.filter((entry) => entry.isFavorite);

  if (favouriteEntries.length === 0) {
    return <ErrorUI title="No favourite entries yet!" />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {favouriteEntries.map((entry) => (
        <EntryCard
          key={entry.id}
          {...{ ...entry, date: entry.date.toISOString() }}
        />
      ))}
    </div>
  );
}
