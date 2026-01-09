"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "@/lib/services/auth-client";
import { useRouter } from "next/navigation";

export default function LogIn() {
  const { isPending } = useSession();
  const router = useRouter();

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Sign in</h1>

        <Button
          onClick={async () => {
            await signIn.social({
              provider: "github",
              callbackURL: "/dashboard",
            });
          }}
        >
          Continue with GitHub
        </Button>

        <Button
          variant="destructive"
          onClick={async () => {
            await signIn.social({
              provider: "google",
              callbackURL: "/dashboard",
            });
          }}
        >
          Continue with Google
        </Button>
      </div>
    </div>
  );
}
