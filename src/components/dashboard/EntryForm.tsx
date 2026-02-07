"use client";

import { useEffect } from "react";
import { useJournal } from "@/lib/hooks/use-journal";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { EntryFormSchema, type EntryFormData } from "@/lib/models/entry";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface Props {
  mode: "create" | "edit";
  id?: string;
  selectedDate?: string;
}

export default function EntryForm({ mode, id, selectedDate }: Props) {
  const router = useRouter();
  const addEntry = useJournal((s) => s.addEntry);
  const updateEntry = useJournal((s) => s.updateEntry);
  const getEntry = useJournal((s) => s.getEntry);
  const isLoading = useJournal((s) => s.isLoading);

  const today = new Date().toISOString().slice(0, 10);

  /* Form */
  const form = useForm<EntryFormData>({
    resolver: zodResolver(EntryFormSchema),
    defaultValues: {
      title: "",
      content: "",
      date: selectedDate || today,
      coverImage: "",
    },
  });

  /* Load existing entry (edit mode) */
  useEffect(() => {
    if (mode === "edit" && id) {
      const entry = getEntry(id);
      if (!entry) return;

      form.reset({
        title: entry.title,
        content: entry.content,
        date: entry.date.toISOString().slice(0, 10),
        coverImage: entry.coverImage ?? "",
      });
    }
  }, [mode, id, getEntry, form]);

  async function onSubmit(values: EntryFormData) {
    const finalDate = new Date(values.date);

    const entryPayload = {
      id: id || crypto.randomUUID(),
      title: values.title,
      content: values.content,
      date: finalDate.toISOString(),
      coverImage: values.coverImage || "",
      isFavorite: false,
    };

    if (mode === "create") {
      await addEntry(entryPayload);
    } else {
      await updateEntry(entryPayload);
    }

    router.push("/dashboard/entries");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <h1 className="h2 font-bold">
        {mode === "create" ? "New Entry" : "Edit Entry"}
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* TITLE */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Entry title..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* CONTENT */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your thoughts..."
                    className="h-60"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* DATE */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* COVER IMAGE */}
          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Paste an image URL..."
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5 mr-1" />
                {mode === "create" ? "Creating..." : "Saving..."}
              </>
            ) : mode === "create" ? (
              "Create Entry"
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
