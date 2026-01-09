"use client";

import EntryCard from "@/components/entries/EntryCard";
import { ErrorUI } from "@/components/shared";
import Loader from "@/components/shared/Loader";
import { useJournal } from "@/lib/hooks/use-journal";

export default function EntriesPage() {
  const { entries, isLoading } = useJournal();

  if (isLoading) {
    return <Loader />;
  }

  if (entries.length === 0) {
    return (
      <ErrorUI
        title="No entries yet"
        description="start writing your first thought ✨"
        cta={{ title: "Create your first entry!", href: "/entries/new" }}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {entries.map((entry) => (
        <EntryCard
          key={entry.id}
          {...{ ...entry, date: entry.date.toISOString() }}
        />
      ))}
    </div>
  );
}
