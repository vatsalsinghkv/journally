import Image from "next/image";
import { Button } from "../ui/button";
import UnstyledLink from "./UnstyledLink";

type Props = {
  title: string;
  description?: string;
  cta?: { title: string; href: string };
};

export default function ErrorUI({ title, description, cta }: Props) {
  return (
    <div className="text-center py-10">
      <Image
        src="/images/ghost-rafiki.svg"
        alt="Error"
        className="mx-auto"
        width={350}
        height={350}
      />
      <div className="space-y-2 mt-2">
        <h1 className="h2">{title}</h1>
        {description && <p>{description}</p>}
      </div>

      {cta && (
        <Button asChild className="mt-3 text-xs" size="sm" variant="link">
          <UnstyledLink href={cta.href}>{cta.title}</UnstyledLink>
        </Button>
      )}
    </div>
  );
}
