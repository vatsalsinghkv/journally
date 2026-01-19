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
import { toast } from "sonner";

/* =========================================================
 * TYPES
========================================================= */

type JournalState = {
  entries: Entry[];
  error: string | null;
};

type JournalContextType = JournalState & {
  isLoading: boolean;
  addEntry: (data: EntryFormData) => Promise<void>;
  updateEntry: (data: EntryFormData) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  getEntry: (id: string) => Entry | null;
};

type Action =
  | { type: "LOAD_SUCCESS"; payload: Entry[] }
  | { type: "LOAD_ERROR"; payload: string }
  | { type: "ADD_ENTRY"; payload: Entry }
  | { type: "UPDATE_ENTRY"; payload: Entry }
  | { type: "DELETE_ENTRY"; payload: string }
  | { type: "TOGGLE_FAVORITE"; payload: string };

/* =========================================================
 * REDUCER
========================================================= */

function journalReducer(state: JournalState, action: Action): JournalState {
  switch (action.type) {
    case "LOAD_SUCCESS":
      return { entries: action.payload, error: null };

    case "LOAD_ERROR":
      return { ...state, error: action.payload };

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
 * CONTEXT
========================================================= */

const JournalContext = createContext<JournalContextType | null>(null);

/* =========================================================
 * PROVIDER
========================================================= */

export function JournalProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(journalReducer, {
    entries: [],
    error: null,
  });

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await getEntries();

        if (res.success) {
          dispatch({ type: "LOAD_SUCCESS", payload: res.data });
        } else {
          throw new Error(res.error ?? "Failed to load journal entries");
        }
      } catch (error) {
        dispatch({
          type: "LOAD_ERROR",
          payload: (error as Error).message ?? "Failed to load journal entries",
        });

        toast.error("Failed to load journal entries");
      }
    });
  }, []);

  const addEntry = async (data: EntryFormData) => {
    startTransition(async () => {
      const res = await createEntry({
        ...data,
        date: new Date(data.date),
      });

      if (res.success) {
        dispatch({ type: "ADD_ENTRY", payload: res.data });
        toast.success("Entry added", {
          description: "Your thoughts have been saved.",
        });
      } else {
        dispatch({ type: "LOAD_ERROR", payload: res.error });
        toast.error("Entry not added!", {
          description: res.error,
        });
      }
    });
  };

  const updateEntryHandler = async (data: EntryFormData) => {
    startTransition(async () => {
      try {
        const res = await updateEntry({ ...data, date: new Date(data.date) });

        if (res.success) {
          dispatch({ type: "UPDATE_ENTRY", payload: res.data });
          toast.success("Entry updated", {
            description: "Your changes were saved.",
          });
        } else {
          throw new Error(res.error ?? "Failed to update entry");
        }
      } catch (error) {
        dispatch({ type: "LOAD_ERROR", payload: (error as Error).message });
        toast.error("Entry not updated!", {
          description: (error as Error).message,
        });
      }
    });
  };

  const deleteEntryHandler = async (id: string) => {
    startTransition(async () => {
      dispatch({ type: "DELETE_ENTRY", payload: id });

      const res = await deleteEntry(id);
      if (res.success) {
        toast("Entry deleted", {
          description: "You can undo this action.",
          action: {
            label: "Undo",
            onClick: async () => {
              if (res.data) {
                const resp = await createEntry(res.data, res.data.id);
                if (!resp.success) {
                  toast.error("Failed to restore entry", {
                    description: resp.error,
                  });
                  return;
                }
                dispatch({ type: "ADD_ENTRY", payload: res.data });
                toast.success("Entry restored");
              }
            },
          },
        });
      } else {
        dispatch({ type: "LOAD_ERROR", payload: res.error });
        toast.error("Failed to delete entry", {
          description: res.error,
        });
      }
    });
  };

  const toggleFavoriteHandler = async (id: string) => {
    startTransition(async () => {
      dispatch({ type: "TOGGLE_FAVORITE", payload: id });

      const res = await toggleFavorite(id);

      toast(res.success ? "Removed from favourites" : "Added to favourites", {
        icon: res.success ? "💔" : "❤️",
      });

      if (!res.success) {
        dispatch({ type: "LOAD_ERROR", payload: res.error });
      }
    });
  };

  const getEntry = (id: string): Entry | null =>
    state.entries.find((e) => e.id === id) ?? null;

  return (
    <JournalContext.Provider
      value={{
        ...state,
        isLoading: isPending,
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
