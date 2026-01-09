"use client";

import { PenLine, CalendarDays, Heart, Sparkles } from "lucide-react";
import Image from "next/image";

import type { FeatureType } from "@/lib/types";
import { Wrapper } from "@/components/layout";

import Feature from "./Feature";

const Features = () => {
  return (
    <Wrapper id="features">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mt-16 mb-6 h1">
          A Calm Space to <br />
          <span className="text-gradient-primary">Think, Write & Reflect</span>
        </h2>

        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground">
          Your journal isn’t just a place to write — it’s a companion for
          clarity, emotional awareness, and intentional living.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 items-center gap-y-12 gap-x-6 sm:mt-20 lg:grid-cols-7">
        {/* Left Features */}
        <div className="space-y-8 lg:col-span-3 lg:pr-14 xl:pr-20">
          <div className="space-y-6">
            {features.slice(0, 3).map((feat) => (
              <Feature key={feat.id} {...feat} />
            ))}
          </div>
        </div>

        {/* Right Visual */}
        <div className="lg:col-span-4">
          <Image
            width={750}
            height={350}
            className="w-full rounded-lg shadow-xl"
            src="/images/preview-close.png"
            alt="Journally Dashboard"
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Features;

/* -------------------------------- Features Data -------------------------------- */

export const features: FeatureType[] = [
  {
    id: "f1",
    name: "Distraction-Free Writing",
    description:
      "A clean, calming editor designed to help your thoughts flow naturally — no noise, no pressure.",
    icon: PenLine,
  },
  {
    id: "f2",
    name: "Daily & Calendar View",
    description:
      "Easily revisit past entries and see how your days connect over time through a simple calendar.",
    icon: CalendarDays,
  },
  {
    id: "f3",
    name: "Favourites & Highlights",
    description:
      "Save moments that matter — thoughts you want to return to, remember, or reflect on later.",
    icon: Heart,
  },
  {
    id: "f4",
    name: "Gentle Prompts & Insights",
    description:
      "When words feel heavy, thoughtful prompts help you begin and understand patterns in your writing.",
    icon: Sparkles,
  },
];
