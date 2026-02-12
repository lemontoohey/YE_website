"use client";

import { useCallback } from "react";

/**
 * Programmatic sub bass thud (from scalar_website).
 * 50Hz sine ramping to 15Hz over 0.6s with lowpass filter.
 */
function playThud(volume = 0.4) {
  if (typeof window === "undefined") return;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Safari webkitAudioContext
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = "sine";
    osc.frequency.setValueAtTime(50, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(15, ctx.currentTime + 0.6);
    filter.type = "lowpass";
    filter.frequency.value = 80;
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  } catch {}
}

export function useSoundEffect(volume?: number) {
  return useCallback(
    () => playThud(volume ?? 0.4),
    [volume]
  );
}
