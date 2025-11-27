// /lib/hooks/use-journal.tsx
"use client";

import {
  createContext,
  useEffect,
  useCallback,
  useContext,
  useState,
} from "react";
import type { EntryType } from "@/lib/models/entry";

interface JournalContextType {
  entries: EntryType[];
  createEntry: (
    title: string,
    content: string,
    date: Date,
    coverImage?: string | null,
  ) => void;
  updateEntry: (
    id: string,
    title: string,
    content: string,
    date: Date,
    coverImage?: string | null,
  ) => void;
  deleteEntry: (id: string) => void;
  getEntry: (id: string) => EntryType | null;
  toggleFavorite: (id: string) => void;
}

const STORAGE_KEY = "journal-entries";
export const JournalContext = createContext<JournalContextType | null>(null);

export function JournalProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<EntryType[]>([]);

  // Load + migrate saved entries to include isFavorite boolean
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: any[] = JSON.parse(saved);
        // defensive migration: ensure isFavorite exists and is boolean
        const migrated = parsed.map((e) => ({
          ...e,
          isFavorite: typeof e.isFavorite === "boolean" ? e.isFavorite : false,
          coverImage: e.coverImage ?? "",
        }));
        setEntries(migrated);
      }
    } catch (err) {
      console.error("Failed to load journal entries", err);
      setEntries([]);
    }
  }, []);

  const saveEntries = useCallback((updated: EntryType[]) => {
    setEntries(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to save journal entries", err);
    }
  }, []);

  const createEntry = useCallback(
    (
      title: string,
      content: string,
      date: Date,
      coverImage: string | null = null,
    ) => {
      const entry: EntryType = {
        id: Date.now().toString(),
        title,
        content,
        date: date.toISOString(),
        coverImage: coverImage || "",
        isFavorite: false,
      };
      saveEntries([entry, ...entries]);
    },
    [entries, saveEntries],
  );

  const updateEntry = useCallback(
    (
      id: string,
      title: string,
      content: string,
      date: Date,
      coverImage: string | null = null,
    ) => {
      const updated = entries.map((e) =>
        e.id === id
          ? {
              ...e,
              title,
              content,
              date: date.toISOString(),
              coverImage: coverImage ?? e.coverImage ?? "",
              // preserve existing isFavorite boolean (if present)
              isFavorite:
                typeof e.isFavorite === "boolean" ? e.isFavorite : false,
            }
          : e,
      );
      saveEntries(updated);
    },
    [entries, saveEntries],
  );

  const deleteEntry = useCallback(
    (id: string) => {
      const filtered = entries.filter((e) => e.id !== id);
      saveEntries(filtered);
    },
    [entries, saveEntries],
  );

  const getEntry = useCallback(
    (id: string) => entries.find((e) => e.id === id) || null,
    [entries],
  );

  const toggleFavorite = useCallback(
    (id: string) => {
      const updated = entries.map((e) =>
        e.id === id ? { ...e, isFavorite: !Boolean(e.isFavorite) } : e,
      );
      saveEntries(updated);
    },
    [entries, saveEntries],
  );

  return (
    <JournalContext.Provider
      value={{
        entries,
        createEntry,
        updateEntry,
        deleteEntry,
        getEntry,
        toggleFavorite,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
}

export function useJournal() {
  const ctx = useContext(JournalContext);
  if (!ctx) throw new Error("useJournal must be used inside <JournalProvider>");
  return ctx;
}
