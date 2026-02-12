"use client";

import { useEffect } from "react";

export default function AboutPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const base = window.location.pathname.replace(/\/about$/, "") || "/";
      window.location.replace(base + (base.endsWith("/") ? "" : "/") + "#about");
    }
  }, []);
  return null;
}
