import { Facebook, Instagram, Twitter, LucideIcon } from "lucide-react";

import type { IconLinkType, LinkType } from "@/lib/types";

import Wrapper from "@/components/layout/Wrapper";
import { Logo } from "@/components/shared";
import { NavLink, UnstyledLink } from "@/components/shared";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <Wrapper as="footer" className="bg-background text-foreground">
      {/* ---------------- Top Row ---------------- */}
      <div className="relative flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
        <Logo />

        <ul className="flex flex-wrap items-center justify-center gap-4 text-sm">
          {links.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.name}
            </NavLink>
          ))}
        </ul>

        {socialLinks.length > 0 && (
          <ul className="flex items-center gap-2">
            {socialLinks.map((link, i) => {
              const Icon = link.icon as LucideIcon;
              return (
                <li key={`${link.href}-${i}`}>
                  <Button variant="ghost" size="icon" asChild>
                    <UnstyledLink href={link.href} aria-label="Social link">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </UnstyledLink>
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* ---------------- Divider ---------------- */}
      <hr className="my-10 border-border/60" />

      {/* ---------------- Bottom Row ---------------- */}
      <div className="flex flex-col-reverse items-center gap-6 text-sm text-muted-foreground md:flex-row md:justify-between">
        <p>
          © {new Date().getFullYear()} Journally — a quiet space to write &
          reflect
        </p>

        <ul className="flex flex-wrap items-center gap-4">
          {supportLinks.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.name}
            </NavLink>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
}

/* -------------------------------- Links -------------------------------- */

const links: LinkType[] = [
  { name: "FAQs", href: "/#faqs" },
  { name: "About", href: "/about" },
  { name: "Reflection", href: "/features/prompts" },
];

const supportLinks: LinkType[] = [
  { name: "Privacy", href: "/privacy-policy" },
  { name: "Terms", href: "/terms-of-service" },
];

/* -------------------------------- Social -------------------------------- */

const socialLinks: IconLinkType[] = [
  {
    href: "https://twitter.com/",
    icon: Twitter,
  },
  {
    href: "https://www.instagram.com/",
    icon: Instagram,
  },
  {
    href: "https://www.facebook.com/",
    icon: Facebook,
  },
];
