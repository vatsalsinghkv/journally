// /lib/models/entry.ts
import { z } from "zod";

export const EntrySchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  content: z.string().min(1),
  date: z.string().min(1),
  coverImage: z.string().optional().or(z.literal("")).nullable(),
  isFavorite: z.boolean().optional(),
});

export type EntryType = z.infer<typeof EntrySchema>;
export type EntryFormData = z.infer<typeof EntrySchema>;
