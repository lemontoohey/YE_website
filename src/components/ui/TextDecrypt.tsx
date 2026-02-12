"use client";

import { useState, useEffect, useRef } from "react";

const GLYPHS = "█▓▒░│┤╡╢╖╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌";

interface TextDecryptProps {
  text: string;
  duration?: number;
  className?: string;
}

function getRandomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

export function TextDecrypt({
  text,
  duration = 1.5,
  className = "",
}: TextDecryptProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [displayChars, setDisplayChars] = useState<string[]>([]);
  const [resolvedCount, setResolvedCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || startedRef.current) return;
    startedRef.current = true;

    const chars = text.split("");
    const totalChars = chars.length;

    setDisplayChars(chars.map(() => getRandomGlyph()));

    const scrambleInterval = 35;
    const startTime = performance.now();

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const targetResolved = Math.floor(progress * totalChars);

      setDisplayChars((prev) =>
        prev.map((_, i) =>
          i < targetResolved ? chars[i] : getRandomGlyph()
        )
      );
      setResolvedCount(targetResolved);

      if (progress >= 1) {
        clearInterval(interval);
      }
    }, scrambleInterval);

    return () => clearInterval(interval);
  }, [isMounted, text, duration]);

  if (!isMounted || displayChars.length === 0) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {displayChars.map((char, i) => (
        <span
          key={i}
          className={i < resolvedCount ? "font-heading" : "font-mono"}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
