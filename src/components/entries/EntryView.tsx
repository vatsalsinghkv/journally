"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Edit, Trash } from "lucide-react";
import { useJournal } from "@/lib/hooks/use-journal";
import { Button } from "@/components/ui/button";
import { UnstyledLink } from "../shared";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  id: string;
}

const EntryView = ({ id }: Props) => {
  const { getEntry, deleteEntry } = useJournal();
  const router = useRouter();

  const entry = getEntry(id);

  if (!entry) return <div className="p-10">Entry not found</div>;

  const { title, date, content, coverImage } = entry;

  const handleDelete = () => {
    deleteEntry(id);
    router.push("/dashboard/entries");
  };

  return (
    <div className="w-full h-full">
      {/* COVER IMAGE */}
      <div className="relative w-full h-64 md:h-80">
        <Image
          src={
            coverImage ||
            "https://images.unsplash.com/photo-1592271019141-b5c71a9cfd71?w=900&auto=format&fit=crop&q=60"
          }
          alt="Cover"
          fill
          className="object-cover aspect-video w-full h-full"
          priority
        />
      </div>

      {/* PAGE CONTENT */}
      <div className="max-w-4xl mx-auto py-12">
        {/* Title + buttons */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="h2">{title}</h1>

          <div className="flex items-center gap-3">
            {/* Edit button */}
            <Button variant="ghost" size="sm" asChild>
              <UnstyledLink href={`/dashboard/entries/edit/${id}`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </UnstyledLink>
            </Button>

            {/* Delete button - Shadcn dialog */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this entry?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. Your journal entry will be
                    permanently removed.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Meta */}
        <p className="text-muted-foreground text-sm mb-10">
          {new Date(date).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* Content */}
        <article className="prose prose-gray max-w-none whitespace-pre-line">
          {content}
        </article>
      </div>
    </div>
  );
};

export default EntryView;
