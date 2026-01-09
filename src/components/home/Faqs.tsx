"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Wrapper } from "../layout";

export default function Faqs() {
  const [selected, setSelected] = useState(-1);

  return (
    <Wrapper id="faqs">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="h1">
          A Few <span className="text-gradient-primary">Gentle</span> Questions
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground leading-relaxed">
          Writing can feel personal. Here are some answers to help you feel
          comfortable, confident, and at ease.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-4xl space-y-5 sm:mt-16">
        {questions.map((item) => (
          <Faq
            key={item.id}
            selected={selected === item.id}
            setSelected={() => setSelected(selected === item.id ? -1 : item.id)}
            {...item}
          />
        ))}
      </div>
    </Wrapper>
  );
}

/* -------------------------------- FAQ Item -------------------------------- */

type FaqProps = {
  selected: boolean;
  setSelected: () => void;
  q: string;
  a: string;
};

const Faq = ({ selected, setSelected, q, a }: FaqProps) => {
  return (
    <button
      type="button"
      onClick={setSelected}
      className={cn(
        "group relative w-full rounded-2xl border text-left",
        "border-border/60 bg-background/60 backdrop-blur-sm",
        "transition-all duration-300",
        selected ? "shadow-md" : "hover:border-border hover:bg-background/80",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
      )}
    >
      {/* Question */}
      <div className="flex items-center justify-between gap-4 px-6 py-5">
        <p
          className={cn(
            "text-base font-medium leading-snug md:text-lg",
            "text-card-foreground",
          )}
        >
          {q}
        </p>

        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-muted-foreground",
            "transition-transform duration-300 ease-out",
            selected && "rotate-180 text-foreground",
          )}
        />
      </div>

      {/* Answer */}
      <div
        className={cn(
          "grid overflow-hidden transition-all duration-300 ease-out",
          selected ? "grid-rows-[1fr]" : "grid-rows-[0]",
        )}
      >
        <div className="px-6 pb-6">
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {a}
          </p>
        </div>
      </div>
    </button>
  );
};

/* -------------------------------- Questions -------------------------------- */

const questions = [
  {
    id: 1,
    q: "Is this journal private?",
    a: "Yes. Your writing is personal and meant only for you. Your entries are securely stored and never shared unless you choose to.",
  },
  {
    id: 2,
    q: "Do I have to write every day?",
    a: "Not at all. Write whenever you feel like it — daily, occasionally, or only when something is on your mind.",
  },
  {
    id: 3,
    q: "What if I don’t know what to write?",
    a: "That’s completely okay. Gentle prompts are available to help you begin when words feel difficult.",
  },
  {
    id: 4,
    q: "Can I revisit my old entries?",
    a: "Yes. You can browse past entries through a simple calendar view and revisit moments whenever you want.",
  },
  {
    id: 5,
    q: "Is this app about productivity or mental health?",
    a: "It’s about reflection and awareness. There’s no pressure to improve or optimize — just space to think, write, and feel.",
  },
];
