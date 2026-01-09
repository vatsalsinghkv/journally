import BG from "@/components/home/Hero/BG";
import { Lottie, UnstyledLink } from "@/components/shared";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="overflow-x-hidden pt-20 md:pt-16">
      {/* Soft background */}
      <BG className="dark:hidden opacity-60" />

      <section className="relative py-14 sm:py-20 lg:py-28">
        <div className="layout">
          <div className="flex flex-col items-center gap-8 md:flex-row md:gap-14">
            {/* LEFT CONTENT */}
            <div className="max-w-2xl text-center md:text-left">
              <p className="inline-flex rounded-full border border-border px-4 py-1.5 text-xs tracking-wide text-muted-foreground">
                A calm space for your thoughts
              </p>

              <h1 className="mt-8 text-4xl font-semibold leading-tight sm:text-5xl">
                Write. Reflect.{" "}
                <span className="text-gradient-primary">Remember.</span>
              </h1>

              <p className="mt-6 max-w-md text-muted-foreground sm:max-w-lg sm:text-base sm:leading-7">
                Journally helps you capture your days, thoughts, and emotions —
                privately and beautifully. No noise. No pressure. Just you and
                your words.
              </p>

              <div className="mt-10 flex flex-col items-center gap-4 md:flex-row md:items-center">
                <Button size="lg" className="px-8" asChild>
                  <UnstyledLink href="/signup">Start Journaling</UnstyledLink>
                </Button>

                <span className="text-sm text-muted-foreground">
                  Free • Private • Yours
                </span>
              </div>
            </div>

            {/* RIGHT VISUAL */}
            <div className="relative h-[320px] w-[320px] shrink-0 sm:h-[380px] sm:w-[380px] md:h-[520px] md:w-[520px]">
              <Lottie
                path="/lotties/reading.json"
                className="absolute inset-0 scale-105 opacity-90"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
