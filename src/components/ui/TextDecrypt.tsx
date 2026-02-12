"use client";

import { useState, useEffect } from "react";

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
  const [displayChars, setDisplayChars] = useState<string[]>([]);
  const [resolvedCount, setResolvedCount] = useState(0);

  useEffect(() => {
    const chars = text.split("");
    setDisplayChars(chars.map(() => getRandomGlyph()));

    const totalChars = chars.length;
    const scrambleInterval = 40;

    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += scrambleInterval;
      const targetResolved = Math.min(
        Math.floor((elapsed / (duration * 1000)) * totalChars),
        totalChars
      );

      setDisplayChars((prev) =>
        prev.map((_, i) =>
          i < targetResolved ? chars[i] : getRandomGlyph()
        )
      );
      setResolvedCount(targetResolved);

      if (targetResolved >= totalChars) {
        clearInterval(interval);
      }
    }, scrambleInterval);

    return () => clearInterval(interval);
  }, [text, duration]);

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
