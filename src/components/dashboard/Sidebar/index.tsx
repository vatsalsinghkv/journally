"use client";
import { Logo, UnstyledLink } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { cn, isActivePath } from "@/lib/utils";
import { Book, Calendar, Feather, Heart, LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

interface Props extends React.HTMLAttributes<HTMLElement> {}

export default function Sidebar({ className }: Props) {
  const pathname = usePathname();

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
                "w-full group justify-start hover:text-blue-400 relative transition-all",
                isActive && "bg-background text-blue-400",
              )}
              asChild
            >
              <UnstyledLink href={menu.url}>
                {isActive && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-blue-400 rounded-r-lg" />
                )}

                <menu.icon className={cn("mr-2 h-5 w-5 transition-all")} />
                {menu.title}
              </UnstyledLink>
            </Button>
          );
        })}
      </nav>
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
    url: "/",
    icon: Calendar,
  },
  {
    title: "New Entry",
    url: "/entries/new",
    icon: Feather,
  },
  {
    title: "My Favourites",
    url: "/entries/favourites",
    icon: Heart,
  },
  {
    title: "All Entries",
    url: "/entries",
    icon: Book,
  },
];
