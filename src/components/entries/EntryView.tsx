"use client";

import Image from "next/image";
import Link from "next/link";
import { useJournal } from "@/lib/hooks/use-journal";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { UnstyledLink } from "../shared";

interface Props {
  id: string;
}

const EntryView = ({ id }: Props) => {
  const entry = useJournal().getEntry(id);

  if (!entry) {
    return <div className="p-10">Entry not found</div>;
  }

  const { title, date, content, coverImage } = entry;

  return (
    <div className="w-full h-full">
      <div className="relative w-full h-64 md:h-80 ">
        <Image
          src={
            coverImage ||
            "https://images.unsplash.com/photo-1592271019141-b5c71a9cfd71?w=900&auto=format&fit=crop&q=60"
          }
          alt="Cover Image"
          fill
          className="object-cover aspect-video w-full h-full"
          priority
        />
      </div>

      {/* ---- PAGE CONTENT ---- */}
      <div className="max-w-4xl mx-auto py-12">
        {/* Title */}
        <div className="flex items-center gap-5">
          <h1 className="h2 mb-3">{title}</h1>

          <Button
            variant="ghost"
            size="sm"
            asChild
            className="flex items-center gap-2"
          >
            <UnstyledLink href={`/entries/edit/${id}`}>
              <Edit className="h-4 w-4" />
              Edit
            </UnstyledLink>
          </Button>
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
