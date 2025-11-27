import { z } from "zod";

export const EntrySchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content cannot be empty"),
  date: z.string().min(1, "Pick a date"),

  // OPTIONAL cover image (URL for now)
  coverImage: z
    .string()
    .url("Must be a valid image URL")
    .optional()
    .or(z.literal("")), // allow empty string
});

export type EntryFormData = z.infer<typeof EntrySchema>;

export type EntryType = {
  id: string;
  title: string;
  content: string;
  date: string; // ISO string
  coverImage?: string;
};
