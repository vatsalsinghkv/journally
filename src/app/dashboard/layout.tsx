import { Sidebar } from "@/components/dashboard";
import { Provider } from "@/components/layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <section className="min-h-screen flex flex-col lg:p-16 lg:px-24 bg-gradient">
        <main className="lg:rounded-xl grow lg:shadow-2xl lg:layout overflow-hidden flex">
          <Sidebar className="bg-fuchsia-50" />
          <section className="w-full p-10 bg-background">{children}</section>
        </main>
      </section>
    </Provider>
  );
}
