"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import type { EntryType } from "../models/entry";

const STORAGE_KEY = "journal-entries";

/* -------------------- TYPES -------------------- */

type JournalState = {
  entries: EntryType[];
  isLoading: boolean;
  error: string | null;
};

type JournalContextType = JournalState & {
  addEntry: (entry: EntryType) => void;
  updateEntry: (entry: EntryType) => void;
  deleteEntry: (id: string) => void;
  toggleFavorite: (id: string) => void;
  getEntry: (id: string) => EntryType | null;
};

type Action =
  | { type: "LOAD_START" }
  | { type: "LOAD_SUCCESS"; payload: EntryType[] }
  | { type: "LOAD_ERROR"; payload: string }
  | { type: "ADD_ENTRY"; payload: EntryType }
  | { type: "UPDATE_ENTRY"; payload: EntryType }
  | { type: "DELETE_ENTRY"; payload: string }
  | { type: "TOGGLE_FAVORITE"; payload: string };

/* -------------------- REDUCER -------------------- */

function journalReducer(state: JournalState, action: Action): JournalState {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, isLoading: true, error: null };

    case "LOAD_SUCCESS":
      return { entries: action.payload, isLoading: false, error: null };

    case "LOAD_ERROR":
      return { ...state, isLoading: false, error: action.payload };

    case "ADD_ENTRY": {
      const updated = [...state.entries, action.payload];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { ...state, entries: updated };
    }

    case "UPDATE_ENTRY": {
      const updated = state.entries.map((e) =>
        e.id === action.payload.id ? action.payload : e,
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { ...state, entries: updated };
    }

    case "DELETE_ENTRY": {
      const updated = state.entries.filter((e) => e.id !== action.payload);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { ...state, entries: updated };
    }

    case "TOGGLE_FAVORITE": {
      const updated = state.entries.map((e) =>
        e.id === action.payload
          ? { ...e, isFavorite: !Boolean(e.isFavorite) }
          : e,
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { ...state, entries: updated };
    }

    default:
      return state;
  }
}

/* -------------------- CONTEXT -------------------- */

const JournalContext = createContext<JournalContextType | null>(null);

/* -------------------- PROVIDER -------------------- */

export function JournalProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(journalReducer, {
    entries: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    dispatch({ type: "LOAD_START" });

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed: EntryType[] = raw ? JSON.parse(raw) : [];

      // Migration: ensure optional fields exist
      const migrated = parsed.map((e) => ({
        ...e,
        coverImage: e.coverImage ?? "",
        isFavorite: typeof e.isFavorite === "boolean" ? e.isFavorite : false,
      }));

      // small delay — allows UI to show loader smoothly
      setTimeout(() => {
        dispatch({ type: "LOAD_SUCCESS", payload: migrated });
      }, 150);
    } catch {
      dispatch({
        type: "LOAD_ERROR",
        payload: "Failed to load entries",
      });
    }
  }, []);

  /* -------------------- ACTION WRAPPERS -------------------- */

  const addEntry = (entry: EntryType) =>
    dispatch({ type: "ADD_ENTRY", payload: entry });

  const updateEntry = (entry: EntryType) =>
    dispatch({ type: "UPDATE_ENTRY", payload: entry });

  const deleteEntry = (id: string) =>
    dispatch({ type: "DELETE_ENTRY", payload: id });

  const toggleFavorite = (id: string) =>
    dispatch({ type: "TOGGLE_FAVORITE", payload: id });

  const getEntry = (id: string): EntryType | null => {
    const found = state.entries.find((e) => e.id === id);
    if (found) return found;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;

      const parsed: EntryType[] = JSON.parse(raw);
      const match = parsed.find((e) => e.id === id);
      return match ?? null;
    } catch {
      return null;
    }
  };

  return (
    <JournalContext.Provider
      value={{
        ...state,
        addEntry,
        updateEntry,
        deleteEntry,
        toggleFavorite,
        getEntry,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
}

/* -------------------- HOOK -------------------- */

export function useJournal(): JournalContextType {
  const ctx = useContext(JournalContext);
  if (!ctx) throw new Error("useJournal must be used inside JournalProvider");
  return ctx;
}
