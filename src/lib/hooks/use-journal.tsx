"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useTransition,
} from "react";

import type { EntryFormData } from "@/lib/models/entry";
import {
  getEntries,
  createEntry,
  updateEntry,
  deleteEntry,
  toggleFavorite,
} from "@/actions/journal";
import type { Entry } from "@/generated/prisma/client";

/* =========================================================
   TYPES
========================================================= */

type JournalState = {
  entries: Entry[];
  isLoading: boolean;
  error: string | null;
};

type JournalContextType = JournalState & {
  addEntry: (data: EntryFormData) => Promise<void>;
  updateEntry: (data: EntryFormData) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  getEntry: (id: string) => Entry | null;
};

type Action =
  | { type: "LOAD_START" }
  | { type: "LOAD_SUCCESS"; payload: Entry[] }
  | { type: "LOAD_ERROR"; payload: string }
  | { type: "ADD_ENTRY"; payload: Entry }
  | { type: "UPDATE_ENTRY"; payload: Entry }
  | { type: "DELETE_ENTRY"; payload: string }
  | { type: "TOGGLE_FAVORITE"; payload: string };

/* =========================================================
   REDUCER
========================================================= */

function journalReducer(state: JournalState, action: Action): JournalState {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, isLoading: true, error: null };

    case "LOAD_SUCCESS":
      return { entries: action.payload, isLoading: false, error: null };

    case "LOAD_ERROR":
      return { ...state, isLoading: false, error: action.payload };

    case "ADD_ENTRY":
      return { ...state, entries: [action.payload, ...state.entries] };

    case "UPDATE_ENTRY":
      return {
        ...state,
        entries: state.entries.map((e) =>
          e.id === action.payload.id ? action.payload : e,
        ),
      };

    case "DELETE_ENTRY":
      return {
        ...state,
        entries: state.entries.filter((e) => e.id !== action.payload),
      };

    case "TOGGLE_FAVORITE":
      return {
        ...state,
        entries: state.entries.map((e) =>
          e.id === action.payload ? { ...e, isFavorite: !e.isFavorite } : e,
        ),
      };

    default:
      return state;
  }
}

/* =========================================================
   CONTEXT
========================================================= */

const JournalContext = createContext<JournalContextType | null>(null);

/* =========================================================
   PROVIDER
========================================================= */

export function JournalProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(journalReducer, {
    entries: [],
    isLoading: true,
    error: null,
  });

  const [, startTransition] = useTransition();

  /* -------- Load entries -------- */

  useEffect(() => {
    dispatch({ type: "LOAD_START" });

    startTransition(async () => {
      const res = await getEntries();

      if (res.success) {
        dispatch({ type: "LOAD_SUCCESS", payload: res.data });
      } else {
        dispatch({
          type: "LOAD_ERROR",
          payload: res.error ?? "Failed to load entries",
        });
      }
    });
  }, []);

  /* -------- Actions -------- */

  const addEntry = async (data: EntryFormData) => {
    const res = await createEntry({
      ...data,
      date: new Date(data.date),
    });

    console.log("createEntry res:", res);

    if (res.success) {
      dispatch({ type: "ADD_ENTRY", payload: res.data });
    } else {
      dispatch({ type: "LOAD_ERROR", payload: res.error });
    }
  };

  const updateEntryHandler = async (data: EntryFormData) => {
    console.log({ "updateEntry data": data });
    const res = await updateEntry({ ...data, date: new Date(data.date) });

    if (res.success) {
      dispatch({ type: "UPDATE_ENTRY", payload: res.data });
    } else {
      dispatch({ type: "LOAD_ERROR", payload: res.error });
    }
  };

  const deleteEntryHandler = async (id: string) => {
    dispatch({ type: "DELETE_ENTRY", payload: id });

    const res = await deleteEntry(id);
    if (!res.success) {
      dispatch({ type: "LOAD_ERROR", payload: res.error });
    }
  };

  const toggleFavoriteHandler = async (id: string) => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: id });

    const res = await toggleFavorite(id);
    if (!res.success) {
      dispatch({ type: "LOAD_ERROR", payload: res.error });
    }
  };

  const getEntry = (id: string): Entry | null =>
    state.entries.find((e) => e.id === id) ?? null;

  return (
    <JournalContext.Provider
      value={{
        ...state,
        addEntry,
        updateEntry: updateEntryHandler,
        deleteEntry: deleteEntryHandler,
        toggleFavorite: toggleFavoriteHandler,
        getEntry,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
}

export function useJournal(): JournalContextType {
  const ctx = useContext(JournalContext);
  if (!ctx) {
    throw new Error("useJournal must be used inside JournalProvider");
  }
  return ctx;
}
