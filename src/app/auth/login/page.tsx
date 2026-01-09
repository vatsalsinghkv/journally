"use client";

import { Github, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/services/auth-client";
import { Logo } from "@/components/shared";

export default function LogIn() {
  const [loadingProvider, setLoadingProvider] = useState<
    "github" | "google" | null
  >(null);

  const handleSocialSignIn = async (provider: "github" | "google") => {
    setLoadingProvider(provider);
    try {
      await signIn.social({ provider, callbackURL: "/dashboard" });
    } catch (err) {
      console.error(err);
      setLoadingProvider(null); // reset if error
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient px-4">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-128 w-lg rounded-full bg-fuchsia-400/25 blur-3xl" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg rounded-3xl border bg-card p-10 shadow-2xl">
        {/* Header */}
        <div className="space-y-3 text-center">
          <Logo className="mx-auto" />
          <h1 className="text-4xl font-semibold tracking-tight text-gradient-primary">
            Welcome
          </h1>
          <p className="text-lg text-muted-foreground">
            Sign in to continue to your dashboard
          </p>
        </div>

        {/* Actions */}
        <div className="mt-10 space-y-4">
          {/* GitHub */}
          <Button
            size="lg"
            className="h-14 w-full gap-3 text-base"
            variant="secondary"
            onClick={() => handleSocialSignIn("github")}
            disabled={loadingProvider !== null}
          >
            {loadingProvider === "github" ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <Github className="h-4 w-4" />
            )}
            Sign up with GitHub
          </Button>

          {/* Google */}
          <Button
            size="lg"
            className="h-14 w-full gap-3 text-base"
            onClick={() => handleSocialSignIn("google")}
            disabled={loadingProvider !== null}
          >
            {loadingProvider === "google" ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <Mail className="h-4 w-4" />
            )}
            Sign up with Google
          </Button>
        </div>

        {/* Divider */}
        <div className="my-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-sm text-muted-foreground">OR</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Email placeholder */}
        <Button
          size="lg"
          variant="outline"
          className="h-14 w-full text-base"
          disabled
        >
          Continue with Email (Coming soon)
        </Button>

        {/* Footer */}
        <p className="mt-8 text-center text-sm leading-relaxed text-muted-foreground">
          By continuing, you agree to our{" "}
          <span className="font-medium text-foreground hover:underline">
            Privacy Policy
          </span>{" "}
          and{" "}
          <span className="font-medium text-foreground hover:underline">
            Terms
          </span>
          .
        </p>
      </div>
    </div>
  );
}
