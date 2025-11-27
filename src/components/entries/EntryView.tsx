"use client";

import Image from "next/image";
import { useJournal } from "@/lib/hooks/use-journal";

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
            "https://images.unsplash.com/photo-1592271019141-b5c71a9cfd71?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGpvdXJuYWx8ZW58MHx8MHx8fDA%3D"
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
        <h1 className="h2 mb-3">{title}</h1>

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
