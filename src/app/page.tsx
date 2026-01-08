import { UnstyledLink } from "@/components/shared";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      Landing Page
      <nav className="flex">
        <Button asChild>
          <UnstyledLink href="/auth/login">Login</UnstyledLink>
        </Button>
      </nav>
      {/* Navbar */}
      {/* Hero */}
      {/* About */}
      {/* Features */}
      {/* FAQs */}
      {/* Footer */}
    </div>
  );
}
