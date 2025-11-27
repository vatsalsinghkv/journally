import Image from "next/image";

import { cn } from "@/lib/utils";

import UnstyledLink, {
  UnstyledLinkProps,
} from "@/components/shared/UnstyledLink";

import { EntryType } from "@/lib/models/entry";

type Props = Omit<UnstyledLinkProps, "href"> & EntryType;

export default function EntryCard({
  coverImage,
  title,
  id,
  content,
  className,
  ...props
}: Props) {
  return (
    <UnstyledLink
      href={`/entries/${id}`}
      className={cn("group rounded-md", className)}
      {...props}
    >
      <div className="block overflow-hidden aspect-w-4 aspect-h-3 rounded-md">
        <Image
          width={450}
          height={300}
          className={cn(
            "object-cover w-full h-full aspect-video",
            "transition-all duration-200 transform group-hover:scale-110",
          )}
          src={
            coverImage ||
            "https://images.unsplash.com/photo-1592271019141-b5c71a9cfd71?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGpvdXJuYWx8ZW58MHx8MHx8fDA%3D"
          }
          alt={title}
        />
      </div>
      <h2 className="mt-4 text-base font-bold group-hover:text-blue-400">
        {title}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {content.slice(0, 50)}...
      </p>
    </UnstyledLink>
  );
}
