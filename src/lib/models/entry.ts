import { z } from "zod";

// Stored entry schema (DB / localStorage)
export const EntrySchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  date: z.string().min(1, "Date is required"),
  coverImage: z.string().optional().or(z.literal("")),
  isFavorite: z.boolean().optional(),
});

export type EntryType = z.infer<typeof EntrySchema>;

// Form schema (NO id, NO isFavorite)
export const EntryFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  date: z.string().min(1, "Date is required"),
  coverImage: z.string().optional().or(z.literal("")),
});

export type EntryFormData = z.infer<typeof EntryFormSchema>;
