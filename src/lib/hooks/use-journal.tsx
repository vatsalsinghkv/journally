"use client";

import { create } from "zustand";

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

type JournalState = {
  entries: Entry[];
  error: string | null;
  isLoading: boolean;
  fetchEntries(): Promise<void>;
  addEntry(data: EntryFormData): Promise<void>;
  updateEntry(data: EntryFormData): Promise<void>;
  deleteEntry(id: string): Promise<void>;
  toggleFavorite(id: string): Promise<void>;
  getEntry(id: string): Entry | null;
};

// * Class Like structure

export const useJournal = create<JournalState>((set, get) => ({
  // * Properties
  entries: [],
  error: null,
  isLoading: false,

  // * Methods
  async fetchEntries() {
    try {
      set({ isLoading: true, error: null });

      const res = await getEntries();

      // * Guard Clause |  Makes code flat by reducing nesting

      if (!res.success) {
        throw new Error(res.error ?? "Failed to load journal entries");
      }

      set({ entries: res.data, error: null, isLoading: false });
    } catch (error) {
      set({
        error: (error as Error).message ?? "Failed to load journal entries",
        isLoading: false,
      });
      toast.error("Failed to load journal entries");
    }
  },

  async addEntry(data) {
    try {
      set({ isLoading: true, error: null });
      // * As date is creating issue, as data.date is in string format, we need to convert it to Date object before sending to API

      const res = await createEntry({ ...data, date: new Date(data.date) });

      if (!res.success) throw new Error(res.error ?? "Failed to add entry");

      set((state) => ({
        entries: [res.data, ...state.entries],
        error: null,
        isLoading: false,
      }));

      toast.success("Entry added", {
        description: "Your thoughts have been saved.",
      });
    } catch (error) {
      set({
        error: (error as Error).message ?? "Failed to add entry",
        isLoading: false,
      });
      toast.error("Failed to add entry");
    }
  },

  async updateEntry(data) {
    try {
      set({ isLoading: true, error: null });
      const res = await updateEntry({ ...data, date: new Date(data.date) });

      if (!res.success) {
        throw new Error(res.error ?? "Failed to update entry");
      }

      set((state) => ({
        entries: state.entries.map((e) =>
          e.id === res.data.id ? res.data : e,
        ),
        error: null,
        isLoading: false,
      }));

      toast.success("Entry updated", {
        description: "Your changes were saved.",
      });
    } catch (error) {
      set({
        error: (error as Error).message ?? "Failed to update entry",
        isLoading: false,
      });
      toast.error("Failed to update entry");
    }
  },

  async deleteEntry(id) {
    set({ error: null });
    const previous = get().entries;

    try {
      // optimistic UI
      set((state) => ({
        entries: state.entries.filter((e) => e.id !== id),
      }));

      const res = await deleteEntry(id);

      if (!res.success) {
        throw new Error(res.error ?? "Failed to delete entry");
      }

      toast.success("Entry deleted");
    } catch (error) {
      set({
        entries: previous,
        error: (error as Error).message ?? "Failed to delete entry",
      });
      toast.error("Failed to delete entry", {
        description: res.error,
      });
    }
  },

  async toggleFavorite(id) {
    try {
      set({ error: null });
      const res = await toggleFavorite(id);

      if (!res.success) {
        throw new Error(res.error ?? "Failed to toggle favorite");
      }

      set((state) => ({
        entries: state.entries.map((e) =>
          e.id === id ? { ...e, isFavorite: !e.isFavorite } : e,
        ),
        error: null,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: (error as Error).message ?? "Failed to toggle favorite",
        isLoading: false,
      });
    }
  },

  getEntry(id) {
    return get().entries.find((e) => e.id === id) ?? null;
  },
}));
