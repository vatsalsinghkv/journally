"use client";

import dynamic from "next/dynamic";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false },
);

type Props = {
  path: string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
};

export default function Lottie({
  path,
  loop = true,
  autoplay = true,
  className,
}: Props) {
  return (
    <div className={`max-w-sm md:max-w-md ${className}`}>
      <Player
        src={path}
        loop={loop}
        autoplay={autoplay}
        className={className}
      />
    </div>
  );
}
