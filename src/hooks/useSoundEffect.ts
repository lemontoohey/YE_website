"use client";

import useSound from "use-sound";

const THUD_SRC = "/sounds/thud.mp3";

export function useSoundEffect() {
  const [play] = useSound(THUD_SRC, {
    volume: 0.6,
    playbackRate: 1,
  });

  return () => play();
}
