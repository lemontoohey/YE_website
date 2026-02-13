"use client";

import { useCallback } from "react";

const THUD_SRC =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_BASE_PATH
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : "") + "/sounds/thud.mp3";

function playThudFile(volume = 0.6) {
  if (typeof window === "undefined") return;
  try {
    const audio = new Audio(THUD_SRC);
    audio.volume = volume;
    audio.play().catch(() => {
      playThudSynth(volume);
    });
  } catch {
    playThudSynth(volume);
  }
}

function playThudSynth(volume = 0.4) {
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

const WHOOSH_SRC =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_BASE_PATH
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : "") + "/sounds/whoosh.mp3";

function playWhooshFile(volume = 0.5) {
  if (typeof window === "undefined") return;
  try {
    const audio = new Audio(WHOOSH_SRC);
    audio.volume = volume;
    audio.play().catch(() => {
      playWhooshSynth(volume);
    });
  } catch {
    playWhooshSynth(volume);
  }
}

function playWhooshSynth(volume = 0.3) {
  if (typeof window === "undefined") return;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Safari webkitAudioContext
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.25);
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2400, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.25);
    gain.gain.setValueAtTime(volume * 0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch {}
}

export function useSoundEffect(volume?: number) {
  return useCallback(
    () => playThudFile(volume ?? 0.6),
    [volume]
  );
}

/** Play whoosh (file with synth fallback, same pattern as thud). */
export function useWhooshOnMount(volume = 0.5) {
  return useCallback(() => playWhooshFile(volume ?? 0.5), [volume]);
}
