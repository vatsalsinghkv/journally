import { cn } from "@/lib/utils";
import UnstyledLink, { type UnstyledLinkProps } from "./UnstyledLink";
import { Feather } from "lucide-react";

interface Props extends Omit<UnstyledLinkProps, "href" | "children"> {
  name?: string;
  href?: string;
}

export const Logo = ({
  name = "Journally",
  className,
  href = "/",
  ...rest
}: Props) => {
  return (
    <UnstyledLink
      href={href}
      className={cn(
        "group flex max-w-max items-center gap-2 rounded outline-none",
        "focus-visible:ring-ring text-foreground ring-offset-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "hover:text-gradient-primary! focus-visible:text-gradient-primary text-xl font-medium capitalize italic text-gradient-primary",
        "p-1",
        className,
      )}
      {...rest}
    >
      <Feather className="mr-0.5 shrink-0 text-blue-400" />
      <span>{name}</span>
    </UnstyledLink>
  );
};

export default Logo;
