// app/entries/[id]/page.tsx

import { notFound } from "next/navigation";
import { Wrapper } from "@/components/layout";
import EntryView from "@/components/entries/EntryView";

interface Props {
  params: Promise<{ id: string }>;
}

// ❗ Next.js Server Components cannot use client hooks.
// We fetch entry inside a Client Component (EntryView)
// and keep page.tsx as a server component.

export default async function EntryPage({ params }: Props) {
  const { id } = await params;

  if (!id) notFound();

  return (
    <Wrapper>
      <EntryView id={id} />
    </Wrapper>
  );
}
