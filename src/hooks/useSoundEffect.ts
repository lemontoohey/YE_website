"use client";

import { useCallback } from "react";
import useSound from "use-sound";

const THUD_SRC = "/sounds/thud.mp3";

export function useSoundEffect() {
  const [play] = useSound(THUD_SRC, {
    volume: 0.6,
    playbackRate: 1,
    onloaderror: () => {
      console.warn("[useSoundEffect] Sound file failed to load:", THUD_SRC);
    },
  });

  return useCallback(() => {
    try {
      play?.();
    } catch {
      // Fail gracefully if play throws (e.g. file missing or 404)
    }
  }, [play]);
}
