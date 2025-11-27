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
  createEntry: (title: string, content: string, date: Date) => void;
  updateEntry: (id: string, title: string, content: string, date: Date) => void;
  deleteEntry: (id: string) => void;
  getEntry: (id: string) => EntryType | null;
}

const STORAGE_KEY = "journal-entries";

export const JournalContext = createContext<JournalContextType | null>(null);

export function JournalProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<EntryType[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setEntries(JSON.parse(saved));
    } catch (err) {
      console.error("Failed to load journal entries", err);
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
    (title: string, content: string, date: Date) => {
      const entry: EntryType = {
        id: Date.now().toString(),
        title,
        content,
        date: date.toISOString(),
      };
      saveEntries([entry, ...entries]);
    },
    [entries, saveEntries],
  );

  const updateEntry = useCallback(
    (id: string, title: string, content: string, date: Date) => {
      const updated = entries.map((e) =>
        e.id === id ? { ...e, title, content, date: date.toISOString() } : e,
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

  return (
    <JournalContext.Provider
      value={{ entries, createEntry, updateEntry, deleteEntry, getEntry }}
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
