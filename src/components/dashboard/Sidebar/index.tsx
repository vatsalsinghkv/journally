"use client";
import { Logo, UnstyledLink } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { cn, isActivePath } from "@/lib/utils";
import { Book, Calendar, Feather, Heart, type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { NavUser } from "./NavUser";
import { signOut, useSession } from "@/lib/services/auth-client";
import { useRouter } from "next/navigation";

interface Props extends React.HTMLAttributes<HTMLElement> {}

export default function Sidebar({ className }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <aside className={cn(className, "w-80 p-10 px-5 flex flex-col")}>
      <Logo name="Journally" className="text-2xl font-bold" />

      <nav className="mt-10 text-muted-foreground space-y-1">
        {MENU.map((menu) => {
          const isActive = isActivePath(pathname, menu.url);

          return (
            <Button
              key={menu.title}
              variant="nav"
              size="lg"
              className={cn(
                "w-full group justify-start hover:text-fuchsia-400 relative transition-all",
                isActive && "bg-background text-fuchsia-400",
              )}
              asChild
            >
              <UnstyledLink href={menu.url}>
                {isActive && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-fuchsia-400 rounded-r-lg" />
                )}

                <menu.icon className={cn("mr-2 h-5 w-5 transition-all")} />
                {menu.title}
              </UnstyledLink>
            </Button>
          );
        })}
      </nav>

      <footer className="mt-auto">
        {session && (
          <NavUser
            user={{
              name: session.user.name,
              email: session.user.email,
              avatar: session.user.image || "",
            }}
            onLogout={async () =>
              await signOut({
                fetchOptions: {
                  onSuccess() {
                    router.push("/");
                  },
                },
              })
            }
          />
        )}
      </footer>
    </aside>
  );
}

type MenuType = {
  title: string;
  url: string;
  icon: LucideIcon;
};

const MENU: MenuType[] = [
  {
    title: "Calendar",
    url: "/dashboard",
    icon: Calendar,
  },
  {
    title: "New Entry",
    url: "/dashboard/entries/new",
    icon: Feather,
  },
  {
    title: "My Favourites",
    url: "/dashboard/entries/favourites",
    icon: Heart,
  },
  {
    title: "All Entries",
    url: "/dashboard/entries",
    icon: Book,
  },
];
