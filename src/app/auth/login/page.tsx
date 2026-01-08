"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "@/lib/services/auth-client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogIn() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace("/dashboard");
    }
  }, [session, router]);

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
          onClick={() =>
            signIn.social({
              provider: "github",
              fetchOptions: {
                onSuccess() {
                  router.replace("/dashboard");
                },
              },
            })
          }
        >
          Continue with GitHub
        </Button>

        <Button
          variant="destructive"
          onClick={() =>
            signIn.social({
              provider: "google",
              fetchOptions: {
                onSuccess() {
                  router.replace("/dashboard");
                },
              },
            })
          }
        >
          Continue with Google
        </Button>
      </div>
    </div>
  );
}
