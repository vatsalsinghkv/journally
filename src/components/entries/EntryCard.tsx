"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import UnstyledLink, {
  type UnstyledLinkProps,
} from "@/components/shared/UnstyledLink";

import { Heart } from "lucide-react";
import { useJournal } from "@/lib/hooks/use-journal";

import type { EntryType } from "@/lib/models/entry";

type Props = Omit<UnstyledLinkProps, "href"> & EntryType;

export default function EntryCard({
  coverImage,
  title,
  id,
  content,
  isFavorite,
  className,
  ...props
}: Props) {
  const toggleFavorite = useJournal((s) => s.toggleFavorite);

  function handleFavClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(id);
  }

  return (
    <div className="relative">
      {/* Fav Button */}
      <button
        type="button"
        onClick={handleFavClick}
        className={cn(
          "absolute z-20 top-2 right-2 p-1 rounded-full",
          "transition hover:scale-110",
        )}
      >
        <Heart
          size={18}
          className={cn(
            "transition",
            isFavorite ? "fill-red-500 text-red-500" : "text-gray-400",
          )}
        />
      </button>

      <UnstyledLink
        href={`/dashboard/entries/${id}`}
        className={cn("group rounded-md block", className)}
        {...props}
      >
        <div className="block overflow-hidden aspect-w-4 aspect-h-3 rounded-md relative">
          <Image
            width={450}
            height={300}
            className={cn(
              "object-cover w-full h-full aspect-video",
              "transition-all duration-200 transform group-hover:scale-110",
            )}
            src={
              coverImage ||
              "https://images.unsplash.com/photo-1592271019141-b5c71a9cfd71?w=900&auto=format&fit=crop&q=60"
            }
            alt={title}
          />
        </div>

        <h2 className="mt-4 text-base font-bold group-hover:text-primary">
          {title}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {content.slice(0, 50)}...
        </p>
      </UnstyledLink>
    </div>
  );
}
