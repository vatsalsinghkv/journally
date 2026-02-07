"use client";

import { Sidebar } from "@/components/dashboard";
import { Provider } from "@/components/layout";
import { useJournal } from "@/lib/hooks/use-journal";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fetchEntries = useJournal((s) => s.fetchEntries);
  const entries = useJournal((s) => s.entries);
  const isLoading = useJournal((s) => s.isLoading);

  // * Fetching Initial Entries
  useEffect(() => {
    if (entries.length === 0 && !isLoading) fetchEntries();
  }, [fetchEntries, entries.length, isLoading]);

  return (
    <Provider>
      <section className="min-h-screen flex flex-col lg:p-16 lg:px-24 bg-gradient">
        <main className="lg:rounded-xl grow lg:shadow-2xl overflow-hidden flex">
          <Sidebar className="bg-fuchsia-50" />
          <section className="w-full p-10 bg-background">{children}</section>
        </main>
      </section>
    </Provider>
  );
}
