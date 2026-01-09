"use client";

import * as React from "react";
import Link from "next/link";
import { useInView } from "framer-motion";
import { MenuIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import UnstyledLink, { type UnstyledLinkProps } from "../shared/UnstyledLink";

/* -------------------------------- List Item -------------------------------- */

const ListItem = React.forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  ({ className, title, children, ...props }, ref) => (
    <li>
      <NavigationMenuLink asChild>
        <UnstyledLink
          ref={ref}
          className={cn(
            "block space-y-1 rounded-md p-3 leading-none no-underline transition-colors",
            "hover:bg-accent hover:text-accent-foreground",
            "focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {children}
          </p>
        </UnstyledLink>
      </NavigationMenuLink>
    </li>
  ),
);
ListItem.displayName = "ListItem";

/* -------------------------------- Desktop Menu -------------------------------- */

function Menu() {
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        {nav_links.map((link) => {
          if (link.type === "group") {
            return (
              <NavigationMenuItem key={link.title}>
                <NavigationMenuTrigger>{link.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[420px] gap-3 p-4 md:w-[520px] md:grid-cols-2">
                    {link.links.map(({ title, href, description }) => (
                      <ListItem key={title} title={title} href={href}>
                        {description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem key={link.href}>
              <Link href={link.href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {link.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

/* -------------------------------- Navbar -------------------------------- */

const Navbar = () => {
  const sentinelRef = React.useRef<HTMLDivElement>(null);

  // TRUE when at top, FALSE when scrolled
  const isAtTop = useInView(sentinelRef, { once: false, amount: 0.9 });

  const AuthButtons = ({ isSidebar }: { isSidebar?: boolean }) => (
    <>
      <Button asChild className={cn("shrink-0", isSidebar && "w-full")}>
        <UnstyledLink href="/auth/login">Sign In</UnstyledLink>
      </Button>
    </>
  );

  return (
    <Sheet>
      <div className="fixed inset-x-0 top-0 z-30 flex justify-center px-4">
        <header
          className={cn(
            "layout flex items-center justify-between rounded-2xl transition-all duration-300 mt-0",
            !isAtTop &&
              "border border-border/60 mt-3 bg-background/80 backdrop-blur-xl",
          )}
          style={{
            padding: isAtTop ? "0.9rem" : "0.6rem",
            maxWidth: isAtTop ? "80rem" : "70rem",
          }}
        >
          <Logo />

          <Menu />

          <div className="ml-auto hidden gap-3 sm:flex">
            <AuthButtons />
          </div>

          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="ml-3 flex lg:hidden"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
        </header>
      </div>

      {/* Mobile */}
      <SheetContent className="flex flex-col overflow-y-auto">
        <SheetHeader>
          <Logo />
        </SheetHeader>

        <Accordion collapsible type="single">
          {nav_links.map((link) =>
            link.type === "group" ? (
              <AccordionItem value={link.title} key={link.title}>
                <AccordionTrigger>{link.title}</AccordionTrigger>
                <AccordionContent className="p-0">
                  {link.links.map(({ title, href, description }) => (
                    <UnstyledLink
                      key={title}
                      href={href}
                      className="block rounded-md p-3 text-sm hover:bg-accent"
                    >
                      <div className="font-medium">{title}</div>
                      <p className="text-muted-foreground text-sm">
                        {description}
                      </p>
                    </UnstyledLink>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ) : (
              <UnstyledLink
                key={link.href}
                href={link.href}
                className="block border-b py-4 text-base font-medium"
              >
                {link.title}
              </UnstyledLink>
            ),
          )}
        </Accordion>

        <SheetFooter className="mt-auto flex flex-col gap-2">
          <AuthButtons isSidebar />
        </SheetFooter>
      </SheetContent>

      {/* Scroll sentinel */}
      <div ref={sentinelRef} className="h-px w-full" />
    </Sheet>
  );
};

export default Navbar;

/* -------------------------------- Types -------------------------------- */

type IComponent = {
  title: string;
  href: string;
  description: string;
};

type NavGroup = {
  type: "group";
  title: string;
  links: IComponent[];
};

type NavLink = {
  type: "link";
  title: string;
  href: string;
};

type INavLinks = NavGroup | NavLink;

/* -------------------------------- Links -------------------------------- */

const nav_links: INavLinks[] = [
  {
    type: "group",
    title: "Journal",
    links: [
      {
        title: "Daily Entries",
        href: "/dashboard/entries",
        description: "Write freely about your day, thoughts, or moments.",
      },
      {
        title: "Favourites",
        href: "/dashboard/entries/favourites",
        description: "Revisit entries that matter the most.",
      },
      {
        title: "Calendar",
        href: "/dashboard/calendar",
        description: "View your writing history by date.",
      },
    ],
  },
  {
    type: "group",
    title: "Reflect",
    links: [
      {
        title: "Writing Prompts",
        href: "/features/prompts",
        description: "Gentle prompts when words don’t come easily.",
      },
      {
        title: "Mood Tracking",
        href: "/features/mood-tracking",
        description: "Notice emotional patterns over time.",
      },
      {
        title: "Insights",
        href: "/features/insights",
        description: "Understand yourself through reflection.",
      },
    ],
  },
  {
    type: "link",
    title: "About",
    href: "/about",
  },
];
